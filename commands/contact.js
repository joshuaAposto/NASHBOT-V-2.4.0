module.exports = {
  name: 'contact',
  description: 'Share Contact',
  usage: '[nashPrefix]contact [id/reply/mention]',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    const { messageReply, senderID, threadID, mentions } = event;

    if (senderID === api.getCurrentUserID()) return;

    try {
      let userID;

      if (Object.keys(mentions).length > 0) {
        userID = Object.keys(mentions)[0];
      } else if (args.length > 0) {
        userID = args[0];
      } else if (messageReply) {
        userID = messageReply.senderID;
      } else {
        userID = senderID;
      }

      await api.shareContact('', userID, threadID);
    } catch (error) {
      await api.sendMessage(error.message, threadID, event.messageID);
    }
  }
};