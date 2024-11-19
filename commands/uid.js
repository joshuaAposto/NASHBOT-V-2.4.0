module.exports = {
  name: 'uid',
  description: 'Get user ID',
  usage: '[nashPrefix]uid [id/reply/group/all]',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    let id;

    if (!args[0]) {
      id = event.senderID;
    }

    if (args[0]) {
      if (args[0].startsWith('https://')) {
        const uid = await api.getUID(args[0]);
        return api.shareContact(uid, uid, event.threadID);
      }
    }

    if (event.type === 'message_reply') {
      id = event.messageReply.senderID;
    }

    const t = args.join(' ');
    if (t.indexOf('@') !== -1) {
      id = Object.keys(event.mentions)[0];
    }

    let m = '';
    let c = 0;

    if (t === 'all') {
      for (let i of event.participantIDs) {
        c += 1;
        m += `${c}. ${i}\n`;
      }
      return api.sendMessage(m, event.threadID);
    }

    if (t === '-g' || t === 'group') {
      id = event.threadID;
      return api.sendMessage(id, event.threadID);
    }

    return api.shareContact(id, id, event.threadID);
  }
};