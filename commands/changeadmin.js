const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../config.json');

module.exports = {
    name: "changeadmin",
    description: "Change the current admin UID",
    version: "1.0.0",
    nashPrefix: false,
    cooldowns: 5,
    async execute(api, event, args) {
        const { threadID, messageID, senderID } = event;
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

        if (senderID !== config.adminUID) {
            return api.sendMessage('Only the current admin can use this command.', threadID, messageID);
        }

        if (args.length === 0 || isNaN(args[0])) {
            return api.sendMessage('Usage: changeadmin <new_admin_uid> (only numeric UID)', threadID, messageID);
        }

        const newAdminUID = args[0];
        config.adminUID = newAdminUID; // Automatically change the admin UID
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

        api.sendMessage(`Admin UID changed to: ${newAdminUID}`, threadID, messageID);
    },
};
