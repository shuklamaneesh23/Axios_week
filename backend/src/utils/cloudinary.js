import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a file to Cloudinary and removes the local file afterward.
 * @param {string} localFilePath - The path to the local file to be uploaded.
 * @returns {Promise<Object|null>} - The response from Cloudinary or null if the upload fails.
 */
const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // Check if the file exists
    if (!fs.existsSync(localFilePath)) {
      console.error(`File not found: ${localFilePath}`);
      return null;
    }

    // Uploading the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", response.url);

    // Remove the local file after successful upload
    fs.unlinkSync(localFilePath);
    console.log("Local file removed:", path.basename(localFilePath));
    return response;

  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Attempt to remove the local file if the upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
