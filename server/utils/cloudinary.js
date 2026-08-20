const cloudinary = require("cloudinary").v2;
const config = require("config");

cloudinary.config({
    cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
    api_key: config.get("CLOUDINARY_API_KEY"),
    api_secret: config.get("CLOUDINARY_API_SECRET"),
});

const uploadImageBuffer = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};

module.exports = { uploadImageBuffer };
