import mongoose from "mongoose";
const conversationSchema=new mongoose.Schema({
    createdAt:{
        type:String,
        default:Date.now
    },
    updatedAt:{
        type:String,
        default:""
    },
    participent:[
        {
         type: mongoose.Types.ObjectId,
         ref:"userModel" ,
         required:true
        }
    ],
    message:[
        {
            type:mongoose.Types.ObjectId,
            ref:"message",
            trim:true
        }
    ]
})

const conversationModel=mongoose.model("conversation",conversationSchema);
export default conversationModel;