import mongoose from 'mongoose';
import { dbName } from '../constant.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log("MONGO DB CONNECTION SUCCESSFUL", connectionInstance.connection.host);
    } catch (error) {
        console.error("MONGO DB CONNECTION ERROR: ", error);
    }
}

export { connectDB };