const { createCanvas, loadImage } = require('canvas');
const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
    name: "billboard",
    description: "Create a billboard image with custom text",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    aliases: ["board", "poster"],
    async execute(api, event, args, prefix) {
        const { threadID, messageID, senderID } = event;
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const pathImg = __dirname + '/cache/' + `${timestamp}_billboard.png`;
        const text = args.join(" ");

        if (!text) {
            return api.sendMessage("Enter the content of the comment on the board", threadID, messageID);
        }

        try {
            const name = (await api.getUserInfo(senderID))[senderID].name;
            const getPorn = (await axios.get('https://i.imgur.com/nRoikQP.png', { responseType: 'arraybuffer' })).data;

            api.setMessageReaction("🧐", messageID, () => {}, true);
            fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
            const baseImage = await loadImage(pathImg);
            const canvas = createCanvas(baseImage.width, baseImage.height);
            const ctx = canvas.getContext("2d");

            ctx.drawImage(baseImage, 5, 5, canvas.width, canvas.height);

            ctx.font = "700 14px Arial";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.fillText(name, 440, 340);

            ctx.font = "400 18px Arial";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";

            let fontSize = 10;
            while (ctx.measureText(text).width > 2600) {
                fontSize--;
                ctx.font = `400 ${fontSize}px Arial, sans-serif`;
            }

            const lines = await wrapText(ctx, text, 180);
            ctx.fillText(lines.join('\n'), 358, 375);

            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            api.setMessageReaction("😆", messageID, () => {}, true);
            api.sendMessage({
                body: '',
                attachment: fs.createReadStream(pathImg)
            }, threadID, () => fs.unlinkSync(pathImg), messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while processing the command", threadID, messageID);
        }
    }
};

const wrapText = (ctx, text, maxWidth) => {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        if (ctx.measureText('W').width > maxWidth) return resolve(null);

        const words = text.split(' ');
        const lines = [];
        let line = '';

        while (words.length > 0) {
            let split = false;

            while (ctx.measureText(words[0]).width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }

            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
                line += `${words.shift()} `;
            } else {
                lines.push(line.trim());
                line = '';
            }

            if (words.length === 0) lines.push(line.trim());
        }

        return resolve(lines);
    });
};