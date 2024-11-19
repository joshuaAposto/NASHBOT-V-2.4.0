module.exports = {
    name: 'eval',
    role: 'admin',
    description: 'Evaluate JS commands. Admin access only.',
    cooldown: 0,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;
        const command = args.join(" ");

        if (!command) {
            return api.sendMessage('Please provide a JavaScript command to evaluate.', threadID, messageID);
        }

        try {
            await eval(command);
        } catch (error) {
            api.sendMessage(`Error:\n${error.message}`, threadID, messageID);
        }
    }
};
