const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images", // specify the folder in Cloudinary where you want to store images
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], // optional: resize the image
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

// -----------------------------
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// require('dotenv').config();


// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Create a storage object with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "your_folder_name", // optional, specify the folder in Cloudinary where you want to store files
//     format: async (req, file) => "jpg", // supports promises as well
//     public_id: (req, file) => file.originalname.split('.')[0], // set the public ID of the file
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// module.exports = upload;