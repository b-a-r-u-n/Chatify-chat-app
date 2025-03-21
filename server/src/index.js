import app from './app.js'
import { connectDB } from './Database/index.js';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
})

connectDB()
.then(() => {
    app.on('error' , (error) => {
        console.error("EXPRESS ERROR: ", error);
    })

    app.listen(process.env.PORT || 6000, () =>{
        console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 6000}`);
    })
})