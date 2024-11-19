const fs = require('fs');
const path = require('path');

module.exports = {
  name: "joinNoti",
  version: "1.0.0",
  description: "Join notifications",
  author: "joshuaApostol",
  async onEvent({ api, event, prefix }) {
    try {
      const { logMessageType, logMessageData, threadID } = event;

      if (logMessageType === "log:subscribe") {
        const currentUserID = await api.getCurrentUserID();

        if (logMessageData.addedParticipants?.some(i => i.userFbId === currentUserID)) {
          await api.changeNickname(`[ ${prefix} ]: NashBoT`, threadID, currentUserID);

          const welcomeMessage = `
            📌 𝗝𝗼𝗶𝗻 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 📌
            › ${prefix} connected successfully!
            › Use ${prefix}help to see available commands!
          `;

          await api.sendMessage(welcomeMessage, threadID);
        } else {
          const { addedParticipants } = logMessageData;
          const threadInfo = await api.getThreadInfo(threadID);
          const currentMembersCount = threadInfo.participantIDs.length;
          const participantsList = addedParticipants.map(i => i.fullName).join(", ");
          const welcomeMessage = `
            Hello ${participantsList}, You're the ${currentMembersCount} member of 🤖${threadInfo.name}🤖\n\n
            『 Enjoy your stay and make lots of friends 』
          `;

          const welcomeFolder = path.join(__dirname, 'welcome');
          fs.readdir(welcomeFolder, (err, files) => {
            if (err) {
              console.error('Error reading welcome folder:', err);
              api.sendMessage('An error occurred while processing the welcome video.', threadID);
              return;
            }

            const videoFiles = files.filter(file => {
              const ext = path.extname(file).toLowerCase();
              return ['.mp4', '.mov', '.avi', '.mkv'].includes(ext);
            });

            if (videoFiles.length > 0) {
              const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
              const videoPath = path.join(welcomeFolder, randomVideo);
              const videoStream = fs.createReadStream(videoPath);

              api.sendMessage({ body: welcomeMessage, attachment: videoStream }, threadID);
            } else {
              api.sendMessage(welcomeMessage, threadID);
            }
          });
        }
      }
    } catch (error) {
      console.error('Error in joinNoti event:', error);
      api.sendMessage('An error occurred while processing the join notification.', event.threadID);
    }
  },
};
