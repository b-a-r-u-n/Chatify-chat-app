import express from 'express';
import { checkAuth, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
import { verifyJWT } from '../Middlewares/auth.middleware.js';

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJWT, logoutUser);
router.route('/check').get(verifyJWT, checkAuth);

export default router;