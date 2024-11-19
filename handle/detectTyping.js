module.exports = async function detectTyping(api, event) {
  if (event.type === "typ") {
    if (event.isTyping) {
      api.sendTypingIndicator(event.threadID, (err) => {
        if (err) return console.error(err);
      });
    } else {
      // Stop the typing indicator
      api.sendTypingIndicator(event.threadID, false);
    }
  }
};
