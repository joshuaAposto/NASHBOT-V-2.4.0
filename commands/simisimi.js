const axios = require("axios");

module.exports = {
    name: "sim",
    description: "Interact with Nash API",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    aliases: ["nash"],
    execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        let prompt = args.join(" ");
        if (!prompt) return api.sendMessage("Please enter a prompt.", threadID, messageID);

        api.sendMessage(
            "[ Nash SimiSimi ]\n\nplease wait...",
            threadID,
            (err, info) => {
                if (err) return;

                axios.get(`https://sim.up.railway.app/nash?prompt=${encodeURIComponent(prompt)}&apiKey=nsh-82f0bfcb102a623e5b415b51538b723c`)
                    .then(response => {
                        const reply = response.data.response;
                        api.editMessage(`[ Nash SimiSimi ]\n\n${reply}`, info.messageID);
                    })
                    .catch(error => {
                        console.error("Error fetching data:", error.message);
                        api.editMessage("Failed to fetch data. Please try again later.", info.messageID);
                    });
            },
            messageID
        );
    },
};
