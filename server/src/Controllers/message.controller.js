import mongoose from "mongoose";
import { Message } from "../Models/message.model.js";
import { apiResponce } from "../Utils/apiResponce.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.util.js";

const getMessages = asyncHandler(async (req, res) => {
    //Another user Id
    // const id = req.params.id;
    // const selfId = req.user?._id;

    // Another user Id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const selfId = new mongoose.Types.ObjectId(req.user?._id);

    // const message = await Message.find({
    //     $or: [
    //         {senderId: selfId, receiverId: id},
    //         {senderId: id, receiverId: selfId}
    //     ]
    // })
    // .sort({createdAt: 1})

    const message = await Message.aggregate([
        {
            $match: {
                $or: [
                    {senderId: selfId, receiverId: id},
                    {senderId: id, receiverId: selfId}
                ]
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'senderId',
                foreignField: '_id',
                as: 'senderDetails'
            },
        },
        { 
            $lookup: {
                from: 'users',
                localField: 'receiverId',
                foreignField: '_id',
                as: 'receiverDetails'
            }
        },
        {
            $addFields: {
                senderDetails: { $arrayElemAt: ['$senderDetails', 0]},
                receiverDetails: { $arrayElemAt: ['$receiverDetails', 0] }
            }
        },
        {
            $project: {
                senderId: 1,
                receiverId: 1,
                message: 1,
                image: 1,
                createdAt: 1,
                updatedAt: 1,
                senderDetails: 1,
                receiverDetails: 1
            }
        }
    ])

    res
    .status(200)
    .json(
        new apiResponce(200, 'Messages fetched successfully', message)
    )
})

const sendMessage = asyncHandler(async (req, res) => {
    //Another user Id
    const id = req.params.id;
    const selfId = req.user?._id;

    const {message} = req.body;
    // console.log(req.file);
    
    let imageLocalPath;
    let imageUrl;
    if(req.file){
        imageLocalPath = req.file?.path;

        imageUrl = await uploadOnCloudinary(imageLocalPath);
        if(!imageUrl)
            throw new apiError(500, 'Error uploading image');
    }

    const newMessage = await Message.create({
        senderId: selfId,
        receiverId: id,
        message: message || '',
        image: imageUrl?.url || ''
    })

    if(!newMessage)
        throw new apiError(500, 'Error sending message');

    res
    .status(200)
    .json(
        new apiResponce(200, 'Message sent successfully', newMessage)
    )
})

export {
    getMessages,
    sendMessage
}