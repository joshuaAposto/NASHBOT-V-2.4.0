const autoReact = async (api, event) => {
  if (event.type === "message_reaction" && event.senderID !== api.getCurrentUserID()) {
    let emoji = event.reaction;
    api.setMessageReaction(emoji, event.messageID, (err) => {
      if (err) console.error(err);
    }, true);
  }
};

module.exports = autoReact;