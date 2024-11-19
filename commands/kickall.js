module.exports = {
  name: 'kickall',
  description: 'Remove all group members.',
  usage: '[nashPrefix]kickall',
  nashPrefix: true,
  role: "admin",
  cooldowns: 5,
  aliases: ['bura'],
  execute: async (api, event, args) => {
    try {
      const { participantIDs } = await api.getThreadInfo(event.threadID);
      const botID = api.getCurrentUserID();
      const listUserID = participantIDs.filter(ID => ID !== botID);

      // Check if the user has admin rights
      const threadInfo = await api.getThreadInfo(event.threadID);
      const isAdmin = threadInfo.adminIDs.some(item => item.id === botID);
      if (!isAdmin) {
        return api.sendMessage(`» Need group admin rights.\nPlease add and try again.`, event.threadID, event.messageID);
      }

      // Check if the sender is an admin
      const senderIsAdmin = threadInfo.adminIDs.some(item => item.id === event.senderID);
      if (!senderIsAdmin) {
        return api.sendMessage('» Only group admins can use this command.', event.threadID, event.messageID);
      }

      await api.sendMessage(`» Start deleting all members. Bye everyone.`, event.threadID);

      // Remove all members except the bot
      for (const id of listUserID) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await api.removeUserFromGroup(id, event.threadID);
      }

      // Remove the bot itself
      await new Promise(resolve => setTimeout(resolve, 300000)); // Wait 5 minutes before removing the bot
      await api.removeUserFromGroup(botID, event.threadID);

    } catch (error) {
      console.error('Error executing kickall command:', error);
      await api.sendMessage('» An error occurred while processing the command.', event.threadID);
    }
  }
};