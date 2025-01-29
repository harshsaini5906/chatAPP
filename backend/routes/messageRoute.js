import express from "express";
import {sendMessage ,messageList,searchMessage} from "../controller/messageController.js"
const route=express.Router();

route.post("/sendMessage",sendMessage);
route.get("/messageList/:recieverId",messageList);
route.post("/searchMessage",searchMessage);



export default route;