import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () => {
    const MongoDBurl = process.env.MONGODB_URL;
    mongoose
        .connect(MongoDBurl)
        .then(() => {
            console.log(`Successfully connected to the database!`);
        })
        .catch((error) => console.log(`Error in connecting to the database, Error : ${error}`));
};