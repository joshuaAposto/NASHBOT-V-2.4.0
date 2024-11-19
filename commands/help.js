module.exports = {
    name: "help",
    description: "eyyy",
    nashPrefix: false,
    version: "1.0.2",
    role: 0,
    cooldowns: 7,
    aliases: ["help"],
    execute(api, event, args, prefix) {
        const commands = global.NashBoT.commands;
        const events = global.NashBoT.events;
        const { threadID, messageID } = event;

        const itemsPerPage = 20;
        let pageNumber = args[0] ? parseInt(args[0], 10) : 1;
        pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

        let commandList = "╭━━━━━༺༻━━━━━╮\n";
     commandList += `          𝑪𝒐𝒎𝒎𝒂𝒏𝒅𝒔 𝑮𝒖𝒊𝒅𝒆\n`;
     commandList += `                 𝑷𝒂𝒈𝒆 ${pageNumber}\n`;
        commandList += "╰━━━━━༺༻━━━━━╯\n\n";

        const allCommands = [];
        const eventEntries = Array.from(events.keys());

        commands.forEach((cmd, name) => {
            allCommands.push(name);
        });

        const allEntries = [...allCommands, ...eventEntries];
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedEntries = allEntries.slice(startIndex, endIndex);

        let hasListedCommands = false;
        let hasListedEvents = false;

        paginatedEntries.forEach(name => {
            if (allCommands.includes(name)) {
                if (!hasListedCommands) {
                    commandList += "𝑪𝒐𝒎𝒎𝒂𝒏𝒅𝒔:\n";
                    hasListedCommands = true;
                }
                commandList += `   ↳ ${name}\n`;
            } else if (eventEntries.includes(name)) {
                if (!hasListedEvents && hasListedCommands) {
                    commandList += "\n𝑬𝒗𝒆𝒏𝒕𝒔:\n";
                    hasListedEvents = true;
                }
                commandList += `   ↳ ${name}\n`;
            }
        });

        if (paginatedEntries.length < itemsPerPage && pageNumber > 1) {
            commandList += "\n  No more commands/events.";
        }

        commandList += `\n  Send 'help 1', 'help 2', etc., to see more commands.\n`;
        commandList += "╭━━━━━━━━━━━━━━━━━╯\n";

        api.sendMessage(commandList, threadID, (err, info) => {
            if (!err && info) {
                setTimeout(() => {
                    api.unsendMessage(info.messageID);
                }, 9000);
            }
        }, messageID);
    },
};
