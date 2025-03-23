import express from 'express';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';
import { deleteUser, getAllUsers, updateProfile } from '../Controllers/user.controller.js';

const router = express.Router();

router.route('/users').get(verifyJWT, getAllUsers);
router.route('/update-profile').put(
    verifyJWT,
    upload.single('profileImage'), 
    updateProfile
);
router.route('/delete-user').delete(verifyJWT, deleteUser);

export default router;