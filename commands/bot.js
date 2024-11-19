module.exports = {
    name: "bot",
    description: "bilat mo mabaho",
    nashPrefix: false,
    version: "1.0.0",
    role: "user",
    cooldowns: 5,
    async execute(api, event) {
        const { threadID, messageID } = event;

        const bilat = [
            "███╗░░██╗\n████╗░██║\n██╔██╗██║\n██║╚████║\n██║░╚███║\n╚═╝░░╚══╝",
            "░█████╗░\n██╔══██╗\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝",
            "░██████╗\n██╔════╝\n╚█████╗░\n░╚═══██╗\n██████╔╝\n╚═════╝░",
            "██╗░░██╗\n██║░░██║\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝"
        ];

        let currentIndex = 0;
        let initialMessageID;

        const sendBilat = async (index) => {
            if (index < bilat.length) {
                if (index === 0) {
                    initialMessageID = await api.sendMessage(
                        bilat[index],
                        threadID
                    );
                } else {
                    await api.editMessage(
                        bilat[index],
                        initialMessageID.messageID
                    );
                }
                currentIndex++;
                setTimeout(() => sendBilat(currentIndex), 1000);
            } else {
                await api.editMessage(
                    bilat.join("\n\n") +
                    "\n\nThis bot made by Joshua Apostol.\n" +
                    "For any issues, please report to the owner:\n\n " +
                    "https://www.facebook.com/profile.php?id=100088690249020",
                    initialMessageID.messageID
                );
            }
        };

        sendBilat(currentIndex);
    },
};