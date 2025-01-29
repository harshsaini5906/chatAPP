import React ,{useEffect,useState,useContext}from "react";
import EmojiPicker from 'emoji-picker-react';
import { BiSend } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { chatContext } from "../../../context/ChatContext";
import { SocketContext} from "../../../context/SocketContext";
import {UserContext} from "../../../context/UserContext"

function SendBottom() {
  const {selectUser,setMessageApi,showSearch}=useContext(chatContext)
  const {sockets}=useContext(SocketContext)
  const {login}=useContext(UserContext)
  const[messageList,sendMessage]=useState('')
  const[isEmojiPicker,setEmojiPicker]=useState(false)
  const token=localStorage.getItem("token");


const functionToSendMessage=async()=>{



if(messageList.trim()=== "") return;
setMessageApi(true)
try{
  const response=await fetch("http://localhost:3000/message/sendMessage",{
    method:"post",
    headers:{
      'content-Type':'application/json',
    token:token},
    body:JSON.stringify({ message:messageList,recieverId:`${selectUser.recieverId}`})
  })
   const result=await response.json();
   if(result.status ===  200){
    console.log("message send successfully",result);
    sendMessage('')
   }else{
    console.error("Failed to send message");
   }
}catch(err){
  console.log("something went wrong catch block exeuted in send message api",err);
}
}
 // Emit typing event to the receiver
  const handleTyping = () => {
    if (messageList) {
      sockets.emit("typing", { senderId: login._id, receiverId: selectUser.recieverId });
    }
  };

const sendMessageFromInput=(e)=>{
  // console.log("=======>>>",e.target.value)
  sendMessage(e.target.value);
  handleTyping();
  
}
// console.log("messageList",messageList);
const handleKeyDown = (e) => {
  if (e.key == 'Enter') {
    // console.log("========key down");
    
    sendMessage(e.target.value);
  }
};
const toggleEmojiPicker=()=>{
  setEmojiPicker(!isEmojiPicker);
}
const onEmojiClick=(emojiData)=>{
  sendMessage(messageList+emojiData.emoji);
  setEmojiPicker(false)

}


  return (
   
    <div className={`h-[12%] p-6 bg-green-100 flex `}>
      <div className="w-[100%] flex space-x-0">

        <div className=" flex justify-center items-center mr-2 hover:scale-125 duration-300 ">
          <button>
            <AiOutlinePlus className="text-black text-3xl" />
          </button>
        </div>

        <div className=" items-center flex justify-center text-2xl ">
          <button className="mr-2" onClick={toggleEmojiPicker}>
          🤡
          </button>
          {isEmojiPicker && <div className="absolute bottom-16 left-28">
            <EmojiPicker onEmojiClick={onEmojiClick}/>
          </div> }
        </div>

        <div className="w-[45%] ">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered input-lg w-[100%] h-10 text-1xl text-black rounded-r-none focus:outline-none"
            onChange={sendMessageFromInput}
            value={messageList}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className=" flex justify-center items-center h-10 border-white bg-white rounded-r-lg">
          <button onClick={functionToSendMessage}>
            <BiSend className="text-black text-3xl" />
          </button>
        </div>
      </div>
    </div>
   
  );
}

export default SendBottom;
