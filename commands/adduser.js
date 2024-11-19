module.exports = {
    name: "adduser",
    description: "Add a user to the group chat using their UID",
    nashPrefix: false,
    version: "1.0.0",
    role: "admin",
    cooldowns: 5,
    async execute(api, event, args) {
        const { threadID, messageID } = event;
        const uid = args[0];

        if (!uid) {
            return api.sendMessage(
                "[ 𝙰𝙳𝙳 𝚄𝚂𝙴𝚁 ]\n\n" +
                "❗ Please provide a UID to add.\n\nExample: adduser 1234567890",
                threadID,
                messageID
            );
        }

        api.sendMessage(
            "[ 𝙰𝙳𝙳 𝚄𝚂𝙴𝚁 ]\n\n" +
            "Attempting to add the user...",
            threadID,
            async (err, info) => {
                if (err) return;

                try {
                    await api.addUserToGroup(uid, threadID);
                    api.editMessage(
                        "[ 𝙰𝙳𝙳 𝚄𝚂𝙴𝚁 ]\n\n" +
                        "User added successfully!\n\nHow to unsend a message?, react to it with a thumbs up (👍). If you are the sender, the bot will automatically unsend the message.",
                        info.messageID
                    );
                } catch (error) {
                    api.sendMessage(
                        "❌ Failed to add user. Please check the UID and try again.",
                        threadID,
                        messageID
                    );
                }
            },
            messageID
        );
    },
};
