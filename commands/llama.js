const axios = require("axios");

module.exports = {
    name: "llama",
    description: "Interact with the Llama API",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    aliases: ["llama"],
    async execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        const query = args.join(" ");

        if (!query) {
            return api.sendMessage("Please enter a query.", threadID, messageID);
        }

        global.handle = global.handle || { replies: {} };

        api.sendMessage("[ Llama ]\n\nPlease wait...", threadID, (err, info) => {
            if (err) return;

            axios.get(`${global.NashBot.JOSHUA}Llama?q=${encodeURIComponent(query)}`)
                .then(response => {
                    const reply = response.data.response;
                    api.editMessage(
                        `[ Llama ]\n\n${reply}`,
                        info.messageID
                    );
                    global.handle.replies[info.messageID] = {
                        cmdname: module.exports.name,
                        this_mid: info.messageID,
                        this_tid: info.threadID,
                        tid: threadID,
                        mid: messageID,
                    };
                })
                .catch(error => {
                    console.error("Error fetching data:", error.message);
                    api.editMessage("Failed to fetch data. Please try again later.", info.messageID);
                });
        }, messageID);
    },
};
