import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '15kb'}));
app.use(express.urlencoded({
    extended: true,
    limit: '15kb'
}))
app.use(cookieParser());

//Routes
import authRoutes from './Routes/auth.Route.js';
import userRoutes from './Routes/user.route.js';
import messageRoutes from './Routes/message.route.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/message', messageRoutes);

export default app;