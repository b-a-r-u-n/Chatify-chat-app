import { User } from "../Models/user.model.js";
import { apiError } from "../Utils/apiError.util.js";
import { apiResponce } from "../Utils/apiResponce.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../Utils/cloudinary.util.js";

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({
        _id: { $ne: req.user?._id }
    }).select('-password')
    if(!users)
        throw new apiError(404, 'No users found');

    res
    .status(200)
    .json(
        new apiResponce(200, 'Users found', users)
    )
})

const updateProfile = asyncHandler(async (req, res) => {
    const { fullName } = req.body;
    
    let imageLocalPath;
    let profileImageUrl;
    if(req.file){
        imageLocalPath = req.file?.path;
        
        profileImageUrl = await uploadOnCloudinary(imageLocalPath);
        if(!profileImageUrl)
            throw new apiError(500, 'Error uploading image');
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName: fullName || req.user?.fullName,
                profileImage: profileImageUrl?.url || req.user?.profileImage
            }
        },
        {
            new: true
        }
    ).select('-password');
    if(!user)
        throw new apiError(500, 'Error updating profile');

    deleteFromCloudinary(req.user?.profileImage);

    res
    .status(200)
    .json(
        new apiResponce(200, 'Profile updated', user)
    )
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user?._id);
    if(!user)
        throw new apiError(500, 'Error deleting profile');
    deleteFromCloudinary(req.user?.profileImage);
    
    res
    .status(200)
    .json(
        new apiResponce(200, 'User deleted', null)
    )
})

export {
    getAllUsers,
    updateProfile,
    deleteUser
}