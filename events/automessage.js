const axios = require('axios');
const cron = require('node-cron');

let isSending = false;

module.exports = {
    name: "catfact",
    description: "edi tanginamo",
    nashPrefix: false,
    version: "1.0.0",
    async onEvent({ api }) {
        const introduceApp = async () => {
            if (isSending) return;
            isSending = true;

            try {
                const catFactResponse = await axios.get('https://rest-api.joshuaapostol.site/cat-fact');
                const catFact = catFactResponse.data.data[0];

                const catImageResponse = await axios.get('https://rest-api.joshuaapostol.site/cat-image');
                const catImageUrl = catImageResponse.data.url;

                const message =`${catFact}\n\n` + `woahhhhh 🫨`;

                const threads = await api.getThreadList(25, null, ['INBOX']);
                for (const thread of threads) {
                    if (thread.isGroup && thread.name !== thread.threadID) {
                        const imageStream = await axios({
                            method: 'get',
                            url: catImageUrl,
                            responseType: 'stream',
                        });

                        await api.sendMessage({ body: message, attachment: imageStream.data }, thread.threadID);
                    }
                }
            } catch (error) {
                console.error('Error sending introduction:', error);
            } finally {
                isSending = false;
            }
        };

        cron.schedule('0 * * * *', () => {
            introduceApp();
        });
    },
};
