import express from 'express';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { getMessages, sendMessage } from '../Controllers/message.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/:id').get(verifyJWT, getMessages);
router.route('/send/:id').post(
    verifyJWT, 
    upload.single('image'),
    sendMessage
);

export default router;