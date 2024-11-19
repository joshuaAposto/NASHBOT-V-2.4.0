const axios = require("axios");

async function gpt4o(q, uid) {
    try {
        const response = await axios.get(`${global.NashBot.JOSHUA}gpt4o-v2?ask=${encodeURIComponent(q)}&id=${uid}`);
        if (response.data.status) {
            return response.data.response;
        } else {
            return "Failed to get a proper response.";
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "gpt4o",
    description: "Talk to GPT4 (v2 conversational)",
    nashPrefix: false,
    version: "1.0.3",
    role: 0,
    cooldowns: 5,
    aliases: ["ai"],
    execute(api, event, args, prefix) {
        const { threadID, messageID, senderID } = event;
        let prompt = args.join(" ");
        if (!prompt) return api.sendMessage("Please enter a prompt.", threadID, messageID);
        
        if (!global.handle) {
            global.handle = {};
        }
        if (!global.handle.replies) {
            global.handle.replies = {};
        }

        api.sendMessage(
            "[ Gpt4o ]\n\n" +
            "⏳ Searching for answer...",
            threadID,
            async (err, info) => {
                if (err) return;
                try {
                    const response = await gpt4o(prompt, senderID);
                    api.editMessage(
                        "[ Gpt4o ]\n\n" +
                        response,
                        info.messageID
                    );
                    global.handle.replies[info.messageID] = {
                        cmdname: module.exports.name,
                        this_mid: info.messageID,
                        this_tid: info.threadID,
                        tid: threadID,
                        mid: messageID,
                    };
                } catch (g) {
                    api.sendMessage("Error processing your request: " + g.message, threadID);
                }
            },
            messageID
        );
    },
};