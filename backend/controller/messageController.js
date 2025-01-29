import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import { getRecieverSocketId } from "../socket/sockit.js";
import { io } from "../socket/sockit.js";
import { sendPushNotification } from "../firebase/firebaseConfig.js";
import conversationModel from "../models/conversationModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//*******api to send message***********/
export const sendMessage = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const tokendata = jwt.verify(req.headers.token, process.env.JWT_SECRET);

    const { message, recieverId, imageURl } = req.body;
    if (!message || !recieverId) {
      return res
        .status(401)
        .json({ error: "Message and receiverId are required" });
    }
    const checkConversation = await conversationModel.findOne({
      participent: { $all: [recieverId, tokendata.userId] },
    });
    // console.log("check conversation",checkConversation)
    let newConversation;
    if (!checkConversation) {
      newConversation = new conversationModel({
        participent: [recieverId, tokendata.userId],
      });
      const newchat = await newConversation.save();
      //  console.log("new chat",newchat)
    } else {
      newConversation = checkConversation;
    }

    const newMessage = new messageModel({
      senderId: tokendata.userId,
      message: message,
      recieverId: recieverId,
      status: "sent",
      image: imageURl ? imageURl : " ",
    });
    await newMessage.save();
    newConversation.message.push(newMessage._id);
    await newConversation.save();
    const recieverDeviceToken = await userModel.findOne(
      { _id: recieverId },
      { deviceToken: 1 }
    );
    const sendDetail = await userModel.findOne(
      { _id: tokendata.userId },
      { name: 1 }
    );

    console.log("device token", recieverDeviceToken);

    const messages = {
      title: `New message from ${sendDetail.name}`,
      body: message,
    };

    await sendPushNotification(recieverDeviceToken.deviceToken, messages);
    // console.log("sendNotification====>>>",sendNotification);

    const recieverSockitId = getRecieverSocketId(newMessage.recieverId);
    // console.log("receiver sockit id=====>>",recieverSockitId)
    if (recieverSockitId) {
      // let messageArray= []  // Wrap the message in an array
      // messageArray.push(newMessage)
      io.to(recieverSockitId).emit("newMessage", newMessage);
      // console.log("new message===>>",recieverSockitId,newMessage);
    }

    const senderSockitId = getRecieverSocketId(newMessage.senderId);
    if (senderSockitId) {
      console.log("sender sockit id====>>", senderSockitId);
      io.to(senderSockitId).emit("newMessage", newMessage);
    }
    res
      .status(200)
      .json({
        status: 200,
        resmessage: "message sent successfully",
        newMessage,
      });
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//**************message list api*****************/
export const messageList = async (req, res) => {
  try {
    // console.log("===")
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const { recieverId } = req.params;
    // console.log("recieverid",recieverId)
    const tokendata = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    // console.log([recieverId,tokendata.userId])
    const message = await conversationModel
      .findOne(
        {
          participent: { $all: [recieverId, tokendata.userId] },
          // $or: [
          //   { senderId: tokendata.userId, recieverId: recieverId },
          //   { senderId: recieverId, recieverId: tokendata.userId },
          // ],
        },
        { message: 1 }
      )
      .populate("message");

    // console.log("message===>>",message);

    const result = message;
    // console.log("result===>>",result)
    if (result) {
      return res.status(200).json({
        status: 200,
        resmessage: "message list fetch successfully",
        result,
      });
    } else {
      return res.status(400).json({ status: 400, resmessage: "No data found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//*************************message search api**************************** */
export const searchMessage = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const { recieverId, createdAt, messages } = req.body;
    const tokendata = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    let query={}
    if(createdAt){
     query.createdAt={$gte:new Date(createdAt)}
    }
    if(messages.length >0){
      
      query.message= { $regex: `${messages}`, $options: "i" }
      // query.message= messages
    }
    query.$or=[
      {$and: [{ senderId: tokendata.userId }, { recieverId: recieverId }]},
      {$and: [{senderId:recieverId},{recieverId:tokendata.userId}]},
      ]
console.log("query===>>",query);

    const searchMessage = await messageModel.find(query);
    if (searchMessage) {
      // console.log("search result===>>", searchMessage);

      return res
        .status(200)
        .json({ status: 200, resmessage: "search result", searchMessage });
    } else {
      return res
        .status(400)
        .json({ status: 200, resmessage: "search result not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    return res
      .status(500)
      .json({ status: 500, resmessage: "Internal server error" });
  }
};
