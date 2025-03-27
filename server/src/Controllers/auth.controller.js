import { User } from "../Models/user.model.js";
import { apiError } from "../Utils/apiError.util.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { apiResponce } from "../Utils/apiResponce.util.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if(!user)
            throw new apiError(400, 'User not found');
        
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        
        if(!refreshToken)
            throw new apiError(500, 'Refresh token not generated');
        if(!accessToken)
            throw new apiError(500, 'Access token not generated');

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    } catch (error) {
        console.log("🔴 Generate Token Error:",error);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName.trim() || !email.trim() || !password.trim())
        throw new apiError(400, 'All fields are required');
    
    const emailExist = await User.findOne({email});
    if(emailExist)
        throw new apiError(400, 'Email already exists');

    const user = await User.create({
        fullName,
        email,
        password
    })

    if(!user)
        throw new apiError(500, 'User not created');

    const createdUser = await User.findById(user._id).select('-password');

    res
    .status(200)
    .json(
        new apiResponce(200, 'User registered successfully', createdUser)
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email.trim() || !password.trim())
        throw new apiError(400, 'All fields are required');

    const user = await User.findOne({email});
    // console.log("🟢 User:",user);
    
    if(!user)
        throw new apiError(400, 'Email does not exist');

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect)
        throw new apiError(400, 'Password is incorrect');

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    // console.log("🟢 Refresh Token:",refreshToken)
    // console.log("🟢 Access Token:",accessToken);

    const loggedInUser = await User.findById(user._id).select('-password');

    //localhost
    const options = {
        httpOnly: true,  // ✅ Prevents XSS attacks
        secure: true,    // ✅ Required for `SameSite: None` (use HTTPS in production)
        sameSite: 'None', // ✅ Allows cross-origin requests
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7-day expiration
    };

    res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new apiResponce(200, 'User logged in successfully', loggedInUser)
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    if(!req.user)
        throw new apiError(400, 'User not logged in');
    
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: ''
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,  // ✅ Prevents XSS attacks
        secure: true,    // ✅ Required for `SameSite: None` (use HTTPS in production)
        sameSite: 'None', // ✅ Allows cross-origin requests
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7-day expiration
    };

    res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
        new apiResponce(200, 'User logged out successfully', {})
    )
})

const checkAuth = asyncHandler(async (req, res) => {
    if(!req.user)
        throw new apiError(400, 'User not logged in');

    res
    .status(200)
    .json(
        new apiResponce(200, 'User is logged in', req.user)
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth
}