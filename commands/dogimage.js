const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'dogimage',
  description: 'random dog image',
  usage: '[nashPrefix]dogimage',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    try {
      const response = await axios.get(`${global.NashBot.JOSHUA}random-dog-image`);
      const imageUrl = response.data.url;

      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data, 'binary');
      const imagePath = path.join(tmpFolderPath, 'dog_image.jpg');

      fs.writeFileSync(imagePath, imageBuffer);

      await api.sendMessage({
        body: 'Here is a random dog image for you!',
        attachment: fs.createReadStream(imagePath)
      }, event.threadID);
      
      fs.unlinkSync(imagePath);

    } catch (error) {
      console.error('Error fetching or sending the dog image:', error);
      api.sendMessage('An error occurred while fetching the dog image.', event.threadID);
    }
  }
};