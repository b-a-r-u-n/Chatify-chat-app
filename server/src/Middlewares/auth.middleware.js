import {asyncHandler} from '../Utils/asyncHandler.util.js'
import {apiError} from '../Utils/apiError.util.js'
import jwt from 'jsonwebtoken';
import {User} from '../Models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers('Authorization')?.replace('Bearer ', '');
    if(!token)
        throw new apiError(401, 'Unauthorized Access');

    const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if(!verifyToken)
        throw new apiError(401, 'Unauthorized Access(Incorrect Token)');
    
    const user = await User.findById(verifyToken._id).select('-password');
    if(!user)
        throw new apiError(401, 'Unauthorized Access(User not found)');

    req.user = user;
    next();
})