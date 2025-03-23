import { Message } from "../Models/message.model.js";
import { apiResponce } from "../Utils/apiResponce.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.util.js";

const getMessages = asyncHandler(async (req, res) => {
    //Another user Id
    const id = req.params.id;
    const selfId = req.user?._id;

    const message = await Message.find({
        $or: [
            {senderId: selfId, receiverId: id},
            {senderId: id, receiverId: selfId}
        ]
    })
    // .sort({createdAt: 1})

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

    let imageLocalPath;
    let imageUrl;
    if(!req.file){
        imageLocalPath = req.file.path;

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