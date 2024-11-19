const axios = require("axios");

module.exports = {
    name: "pinterest",
    description: "Fetches Pinterest images based on a search query.",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    async execute(api, event, args) {
        const { threadID, messageID } = event;
        const query = args.join(" ");

        if (!query) {
            return api.sendMessage(
                "❗ Please provide a search query for Pinterest images.\n\nExample: pinterest jungkuuk",
                threadID,
                messageID
            );
        }

        try {
            const response = await axios.get(`https://deku-rest-api.gleeze.com/api/pinterest?q=${encodeURIComponent(query)}`);
            const images = response.data.result;

            if (images.length === 0) {
                return api.sendMessage("No images found for your query.", threadID, messageID);
            }

            const attachments = [];
            for (const image of images) {
                const imageResponse = await axios.get(image, { responseType: 'stream' });
                attachments.push(imageResponse.data);
            }

            api.sendMessage(
                {
                    body: "[ 𝙋𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 𝙄𝙢𝙖𝙜𝙚𝙨 ]",
                    attachment: attachments
                },
                threadID,
                messageID
            );
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching images. Please try again later.", threadID, messageID);
        }
    },
};
