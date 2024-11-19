const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'cat',
  description: 'random cat image',
  usage: '[nashPrefix]cat',
  nashPrefix: true,
  execute: async (api, event, args, prefix) => {
    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    try {
      const response = await axios.get(`${global.NashBot.JOSHUA}cat-image`);
      const catImageUrl = response.data.url;
      const catImageId = response.data.id;
      const fileExtension = path.extname(catImageUrl);
      const imagePath = path.join(tmpFolderPath, `cat_image${fileExtension}`);

      const imageResponse = await axios.get(catImageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data, 'binary');

      fs.writeFileSync(imagePath, imageBuffer);

      await api.sendMessage({
        body: `Here is a random cat image!`,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID);
      
      fs.unlinkSync(imagePath);

    } catch (error) {
      console.error('Error fetching or sending the cat image:', error);
      api.sendMessage('An error occurred while fetching the cat image.', event.threadID);
    }
  }
};
