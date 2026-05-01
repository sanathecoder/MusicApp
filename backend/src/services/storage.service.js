const ImageKit = require("@imagekit/nodejs");

const ImagekitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file){
    const result = await ImagekitClient.files.upload({
  file,
  fileName: 'music_' + Date.now() ,
  folder: '/music'
});
return result
}

module.exports = {uploadFile}