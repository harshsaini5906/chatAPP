import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGOURL
const connectDB = async () => {
  try {
    const result =await mongoose.connect(mongoURL);
    console.log("===connect to mongodb=====");
    console.log("success", "Mongoose default connection open to " + mongoURL);
  } catch (err) {
    console.log("===connect error====", err);
  }
};

// Event listeners for Mongoose connection
mongoose.connection.on('connecting', () => {
    console.log('Attempting to connect to MongoDB...');
  });
  
  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + mongoURL);
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
  });
  

export default connectDB;
