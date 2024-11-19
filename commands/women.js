const fs = require('fs');

module.exports = {
  name: 'women',
  description: 'Responds with a video when specific keywords are detected.',
  usage: '[nashPrefix]women',
  nashPrefix: true,
  execute(api, event, args, prefix) {
    const { threadID, messageID, body } = event;

    const lowerCaseBody = body.toLowerCase();

    if (lowerCaseBody.includes('women') || lowerCaseBody.includes('babae')) {
      const msg = {
        body: "Pogi kung owner Joshua🥹",
        attachment: fs.createReadStream(__dirname + `/noprefix/Women.mp4`)
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction('☕', messageID, (err) => {
        if (err) console.error('Error setting reaction:', err);
      });
    }
  },
};