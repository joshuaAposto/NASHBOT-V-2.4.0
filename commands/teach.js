const axios = require("axios");

module.exports = {
    name: "teach",
    description: "Teach the AI with a new question and answer pair",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    aliases: ["teach"],
    execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        const input = args.join(" ");
        const [question, answer] = input.split("|").map(item => item.trim());

        if (!question || !answer) {
            return api.sendMessage("Please provide a question and answer in the format: question | answer", threadID, messageID);
        }

        api.sendMessage(
            "[ Teach SimiSimi ]\n\nteaching a nash SimiSimi...",
            threadID,
            (err, info) => {
                if (err) return;

                axios.get(`https://sim.up.railway.app/teach`, {
                    params: {
                        question: question,
                        answer: answer
                    }
                })
                .then(response => {
                    const message = response.data.message;
                    api.editMessage(`[ Teach SimiSimi ]\n\n${message}`, info.messageID);
                })
                .catch(error => {
                    console.error("Error fetching data:", error.message);
                    api.editMessage("Failed to submit data. Please try again later.", info.messageID);
                });
            },
            messageID
        );
    },
};
