const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } =  require('multer-storage-cloudinary');

cloudinary.config({     //config means jodna // so here we want to add our backend with our cloudinary account
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req, file) => 'wanderlust_DEV',
      allowedFormats: ["png", "jpg","jpeg"],
    },
  });

module.exports =  {
    cloudinary,
    storage,
};