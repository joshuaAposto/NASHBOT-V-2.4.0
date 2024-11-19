const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
    name: "bbimage",
    description: "Fetch an image from Blackbox API and display it",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    aliases: ["bbimage", "blackbox"],
    execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");
        
        if (!prompt) return api.sendMessage("Please enter a prompt.", threadID, messageID);
        
        api.sendMessage(
            "[ Blackbox ]\n\nsending image...",
            threadID,
            async (err, info) => {
                if (err) return;

                try {
                    const response = await axios.get(`${global.NashBot.JOSHUA}blackbox?prompt=${encodeURIComponent(prompt)}`);
                    const imageUrl = response.data.response.match(/\((.*?)\)/)[1];
                    
                    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const path = __dirname + '/cache/image_blackbox.jpg';
                    fs.writeFileSync(path, Buffer.from(imageResponse.data, 'utf-8'));

                    api.sendMessage({
                        body: "",
                        attachment: fs.createReadStream(path)
                    }, threadID, () => fs.unlinkSync(path), info.messageID);
                    
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                    api.sendMessage("Failed to fetch image. Please try again later.", threadID, messageID);
                }
            }
        );
    },
};