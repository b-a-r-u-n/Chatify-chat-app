import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { apiError } from './apiError.util.js';
import { log } from 'console';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {    
        if(!localFilePath)
            return null;

        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: 'chat-app',
            resource_type: 'auto',
            quality: "auto:low",  // Automatically reduces quality to a low level
            format: "webp",       // Converts the image to WebP for better compression
            transformation: [
                { fetch_format: "auto", quality: "auto:low" }  // Ensures better optimization
            ]
        })
        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.error(error);
        return null;
    }
}

const deleteFromCloudinary = async (url) => {
    try {
        if(!url)
            throw new apiError(400, 'No file found');
        const publicId = url.split('/').pop().split('.')[0];
        const res = await cloudinary.uploader.destroy(`chat-app/${publicId}`);
        // console.log(publicId);
        // console.log(res);
    } catch (error) {
        console.error(error);
    }
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}