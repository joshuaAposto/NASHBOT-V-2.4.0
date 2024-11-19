const os = require('os');

module.exports = {
  name: 'upt',
  description: 'Uptime of the bot',
  author: 'NashBot',
  nashPrefix: false,
  execute(api, event, args, prefix, commands) {
    const uptimeMessage = generateStatusMessage();
    api.sendMessage(uptimeMessage, event.threadID);
  },
};

function generateStatusMessage() {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);

  const cpuUsage = getCpuUsage();
  const ramUsage = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
  const cores = os.cpus().length;
  const ping = '0ms'; // Replace with actual ping calculation if needed
  const osPlatform = os.platform();
  const cpuArchitecture = os.arch();

  return `BOT has been working for ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s).\n\n` +
    `❖ Cpu usage: ${cpuUsage}%\n` +
    `❖ RAM usage: ${ramUsage} MB\n` +
    `❖ Cores: ${cores}\n` +
    `❖ Ping: ${ping}\n` +
    `❖ Operating System Platform: ${osPlatform}\n` +
    `❖ System CPU Architecture: ${cpuArchitecture}`;
}

function getCpuUsage() {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  }

  const total = user + nice + sys + idle + irq;
  const usage = ((total - idle) / total) * 100;

  return usage.toFixed(2);
}