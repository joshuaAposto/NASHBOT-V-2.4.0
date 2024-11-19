const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'ss',
    description: 'Take a screenshot of a website',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const url = args[0];

        if (!url) {
            return api.sendMessage('Please provide a URL to screenshot.', event.threadID, event.messageID);
        }

        api.sendMessage('Taking a screenshot, please wait...', event.threadID, event.messageID);

        try {
            const response = await axios.get(`${global.NashBot.JOSHUA}screenshot?url=${encodeURIComponent(url)}`);
            const data = response.data;

            if (!data.screenshotURL) {
                throw new Error('Failed to retrieve screenshot URL.');
            }

            const imageUrl = data.screenshotURL;
            const imagePath = path.resolve(__dirname, 'ss.png');

            const imageResponse = await axios({
                url: imageUrl,
                method: 'GET',
                responseType: 'stream'
            });

            imageResponse.data.pipe(fs.createWriteStream(imagePath)).on('finish', () => {
                api.sendMessage({
                    attachment: fs.createReadStream(imagePath)
                }, event.threadID, () => {
                    fs.unlinkSync(imagePath);
                });
            });
        } catch (error) {
            api.sendMessage(`An error occurred: ${error.message}`, event.threadID, event.messageID);
        }
    },
};