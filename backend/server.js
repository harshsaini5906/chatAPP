import express from "express";
import connectDB from "./dbConnection/mongooDb.js";
import routes from "./routes/index.js";
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import {server,app} from "./socket/sockit.js"
// const app =express();
const corsOptions = {
    origin: 'http://localhost:5173', // replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies to be sent and received
  };
  
  app.use(cors(corsOptions));
// app.use(cors());
connectDB();

app.use(express.json()); 
app.use(routes);



const COOKIE_SECRET = process.env.COOKIE_SECRET   // Fetch secret from env file
// console.log("=====>>",COOKIE_SECRET);
app.use(cookieParser('harshsaini'));
// app.use("/",(req,res)=>{
//     res.cookie('token', "gggggggggggggggggggggggggggggggggguuuuugg", { 
//         httpOnly: true,    // Ensures the cookie is only accessible by the server
//         secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (requires HTTPS)
//         maxAge: 5 * 60 * 60 * 1000,  // Cookie expiry time (5 hours in milliseconds)
//         // signed: true       // Enable signed cookies (to prevent tampering)
//       });
//     res.send('Hello, this is your response from Express!');
   
    
// })


server.listen(3000,()=>{
    console.log("server starting on port 3000");
})
