import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    contactNumber:{
        type:Number,
        default:""
    },
    password:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String,
        default:""
    },
    profileImage:{
        type:String,
        default:""
    }

})
const userModel=mongoose.model("userModel",userSchema);
export default userModel;