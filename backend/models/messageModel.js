import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    senderId:{
        type:String,
        default:""
    },
    recieverId:{
        type:String,
        default:""
    },
    message:{
        type:String,
        default:"",
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    chatId:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["sent","delivered","seen"],
        default:"",
        trim:true
    },
    type:{
        type:String,
        default:"",
        // enum:["text","URL","media"]
    },
    image:{
        type:String,
        default:""
    }


});
const messageModel=mongoose.model("message",messageSchema)
export default messageModel