const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'sendnoti',
  description: 'Sends a notification message to all groups',
  usage: '[nashPrefix]sendnoti [Text]',
  nashPrefix: true,
  role: "admin",
  execute: async (api, event, args) => {
    const threadList = await api.getThreadList(100, null, ['INBOX']);
    const customMessage = args.join(' ');

    if (!customMessage) {
      await api.sendMessage('Usage: sendnoti [Text].', event.threadID);
      return;
    }

    await api.sendMessage('Please wait while the notification is being sent...', event.threadID);

    let sentCount = 0;

    for (const thread of threadList) {
      if (sentCount >= 20) break; // Limit the number of messages sent
      if (thread.isGroup && thread.threadID !== event.threadID) {
        try {
          await api.sendMessage(
            `➜ 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 𝗙𝗥𝗢𝗠 𝗔𝗗𝗠𝗜𝗡\n\n➜ ${customMessage}\n\nAutoBotDev: https://www.facebook.com/profile.php?id=100088690249020`,
            thread.threadID
          );
          sentCount++;

          // Convert message to audio
          const audioPath = path.join(__dirname, 'cache', `${thread.threadID}_audio.mp3`);
          await downloadFile(
            `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(customMessage)}&tl=en&client=tw-ob`,
            audioPath
          );
          await api.sendMessage({ attachment: fs.createReadStream(audioPath) }, thread.threadID);
          fs.unlinkSync(audioPath); // Clean up the file
        } catch (error) {
          console.error(`Error sending message to thread ${thread.threadID}:`, error);
        }
      }
    }

    if (sentCount > 0) {
      await api.sendMessage(`› Sent ${sentCount} notifications successfully.`, event.threadID);
    } else {
      await api.sendMessage('› No eligible group threads found to send the message to.', event.threadID);
    }
  }
};

// Helper function to download files
async function downloadFile(url, filePath) {
  const writer = fs.createWriteStream(filePath);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}