import express from 'express';
import { verifyJWT } from '../Middlewares/auth.middleware.js';

const router = express.Router();

router.route('/:id').get(verifyJWT, getMessages);
router.route('/send/:id').post(verifyJWT, sendMessage);

export default router;