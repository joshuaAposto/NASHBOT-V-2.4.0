const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "out",
    description: "Command to make the bot leave the group chat",
    version: "1.0.0",
    nashPrefix: false,
    cooldowns: 5,
    async execute(api, event) {
        const { threadID, messageID, senderID } = event;
        const adminUID = '100088690249020';

        if (senderID !== adminUID) {
            return api.sendMessage('only admin can use this command.', threadID, messageID);
        }

        const gifUrl = 'https://media1.giphy.com/media/O3zRVT9hpgRZWgXzaO/giphy.gif?cid=6c09b952uytiqowzprhw650pzwf2py4iaxgt4hlkuelenfmv&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g';
        const gifPath = path.resolve(__dirname, 'tanginamo.gif');

        try {
            const response = await axios({
                method: 'GET',
                url: gifUrl,
                responseType: 'stream'
            });

            response.data.pipe(fs.createWriteStream(gifPath)).on('finish', () => {
                api.sendMessage(
                    {
                        body: "[ 𝙾𝚄𝚃 ]\n\nbabye mother fucker",
                        attachment: fs.createReadStream(gifPath)
                    },
                    threadID,
                    async (err, info) => {
                        if (err) return;
                        api.removeUserFromGroup(api.getCurrentUserID(), threadID);
                        fs.unlinkSync(gifPath);
                    },
                    messageID
                );
            });
        } catch (error) {
            console.error('unknown error:', error);
        }
    },
};