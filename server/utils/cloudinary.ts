import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath: string | undefined): Promise<UploadApiResponse | null> => {
  if (!localFilePath) {
    return null;
  }
  try {
    // Upload the file to Cloudinary
    const response: UploadApiResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // File has been uploaded successfully
    console.log('file is uploaded on cloudinary ', response.url);
    // fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (localFilePath) {
      // fs.unlinkSync(localFilePath); 
      console.error('Error uploading file:', error);
    }
    return null;
  }
};
export { uploadOnCloudinary };
