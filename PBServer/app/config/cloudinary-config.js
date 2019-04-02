const multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: "dx6tpmzoq",
    api_key: "391517498644695",
    api_secret: "k2zI7_pXey6HIjxPexM3x-XqcwM"
})

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "profileImage",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 175, height: 175, crop: "limit" }]
});

const parser = multer({storage: storage})

module.exports = parser