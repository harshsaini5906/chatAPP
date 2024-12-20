import messageModel from "../models/messageModel.js";
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

    const newMessage = new messageModel({
      senderId: tokendata.userId,
      message: message,
      recieverId: recieverId,
      status: "sent",
      image: imageURl ? imageURl : " ",
    });
    await newMessage.save().then((result) => {
      res
        .status(200)
        .json({ status: 200, resmessage: "message sent successfully", result });
    });
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//**************message list api*****************/
export const messageList = async (req, res) => {
  try {
    if (!req.headers.token) {
      return res.status(400).json({ error: "Please enter the token first" });
    }
    const { recieverId } = req.params;
    const tokendata = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const message = await messageModel.find({
      $or: [
        { senderId: tokendata.userId, recieverId: recieverId },
        { senderId: recieverId, recieverId: tokendata.userId },
      ],
    });
    return res
      .status(200)
      .json({
        status: 200,
        resmessage: "message list fetch successfully",
        message,
      });
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};
