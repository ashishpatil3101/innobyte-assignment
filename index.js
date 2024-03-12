import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import  {connectDB} from './db/connect.js';


const app=express();
const PORT=process.env.PORT || 4001;
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//global error handler middleware
app.use(globalErrorHandler);


app.listen(PORT, ()=>{
    console.log(`Listening to the port ${PORT}`);
    connectDB();
})