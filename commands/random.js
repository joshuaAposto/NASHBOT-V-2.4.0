const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports = {
    name: "randomtik",
    description: "Generate random TikTok girl edit videos",
    nashPrefix: true,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    async execute(api, event, args) {
        const { threadID, messageID } = event;

        try {
            api.sendMessage("Video is sending, please wait...", threadID, messageID);

            const response = await axios.post("https://girledit-api-version-2-production-e493.up.railway.app/api/request/f", { credits: "joshua apostol" });
            const videoUrl = response.data.url;
            const username = response.data.username;
            const nickname = response.data.nickname;

            const videoPath = path.resolve(__dirname, 'girledit_video.mp4');
            const writer = fs.createWriteStream(videoPath);
            const responseStream = await axios({
                url: videoUrl,
                method: 'GET',
                responseType: 'stream'
            });

            responseStream.data.pipe(writer);

            writer.on('finish', () => {
                api.sendMessage({
                    body: `Username: ${username}\nNickname: ${nickname}`,
                    attachment: fs.createReadStream(videoPath)
                }, threadID, () => fs.unlinkSync(videoPath), messageID);
            });
        } catch (error) {
            api.sendMessage(`Error fetching girl edit API!\n${error.message}`, threadID, messageID);
            console.error('Error:', error.message);
        }
    }
};
