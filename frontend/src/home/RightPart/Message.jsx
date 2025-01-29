import React ,{useContext,useEffect,useState} from "react";
import { TbMessageReportFilled } from "react-icons/tb";
import ScrollToBottom from 'react-scroll-to-bottom'; // Import the library
import {MessageContextRealTime} from '../../../context/MessageContextRealTime.js'

import { chatContext } from "../../../context/ChatContext.js";
import { UserContext } from "../../../context/UserContext";

function Message() {
  // const [result,setResult]=useState()
  const {selectUser,hitMessageApi,result,setResult,realmessage,showSearch}=useContext(chatContext)
  MessageContextRealTime();
  // const {login }=useContext(UserContext)
  // console.log("se+++++lected user===>>>",hitMessageApi);
  
  
useEffect(()=>{
 const getMessage=async()=>{
  const token=localStorage.getItem("token");
  const URL=`http://localhost:3000/message/messageList/${selectUser.recieverId}`
 const response= await fetch(URL,{
    method:"get",
    headers:{
      'content-Type':'application/json',
      token:token
    },
    
  })
  // console.log("response",await response.json());
  let result=await response.json()
   setResult(result.result);
  
 }
 getMessage();
},[selectUser,hitMessageApi])
// console.log("result===>>",result)
const userId=localStorage.getItem("userId")
// console.log("login user Id in local storage===>>>",userId)
// console.log("result in message component===>>",result);
return (
  <div className="h-[78%]">
  <ScrollToBottom className={`h-[100%] overflow-scroll scrollbar-hide `}>
    {result?.message && result.message.length > 0 ? (
        result.message.map((item, index) => {
          // {console.log("item====>>",item)}
          const options = { year: 'numeric', month: 'long', day: '2-digit' };
          let date1=new Date(item.createdAt).toLocaleDateString('en-GB',options);
          let nextItem = result.message[index + 1];
          let date2 = nextItem ? new Date(nextItem.createdAt).toLocaleDateString('en-GB',options) : null;
        //  console.log("date",date1,date2);
         
          let dateHours=new Date(item.createdAt).getHours()
          let dateMinutes=new Date(item.createdAt).getMinutes()
          let period = dateHours >= 12 ? 'pm' : 'am'; 
          dateHours = dateHours % 12;
          dateHours = dateHours ? dateHours : 12; // Convert 0 to 12 for midnight
          dateMinutes = dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes; // Ensure two-digit minutes
          let currentDateToShow //used to show in chat starting date
          if(index === 0){
            currentDateToShow = date1 
          }else{
              currentDateToShow = date1 !== date2 ? date2 : null;
          }
          
          return (
            
            <div key={index}>
              {currentDateToShow ? <div className=" flex justify-center items-center"><div className="text-black bg-slate-300  flex-nowrap text-xs text-center rounded-full   p-1">{currentDateToShow}</div></div> : ""}
              {/* Check if message is sent by the logged-in user */}
              {item.senderId == userId ? (
                <div className="chat chat-end">
                  <div className="chat-bubble text-black flex gap-2 justify-center items-center  bg-green-300">
                    <div className="text-black">
                    {item.message}
                    </div>
                    <div className="text-[10px] mt-4 text-gray-900 opacity-100 ">
                      {`${dateHours}:${dateMinutes} ${period}`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat chat-start">
                  <div className="chat-bubble text-black flex gap-2 justify-center items-center  bg-white ">
                    <div className="text-black">
                    {item.message}
                    </div>
                    <div className="text-[10px] mt-4 opacity-100 text-gray-900">
                    {`${dateHours}:${dateMinutes} ${period}`}
                    </div>
                  </div>
                  <div className="chat-header ">
                   
                  </div>

                </div>
              )}
            </div>
          );
        })
      ) : (
       
        <div className="flex justify-center  h-screen ">
        <div className="w-[30%] h-[30%]  flex flex-col shadow-slate-300 shadow items-center rounded-lg mt-[10%] fixed bg-slate-800">
          <h1 className="m-1">No messages here yet...</h1>
          <h1 className="m-2">Send a message</h1>
          <TbMessageReportFilled className="text-[500%] animate-bounce mt-2 text-red-400 " />
        </div>
      </div>
          
      )}



  </ScrollToBottom>
  </div>
)
}

export default Message;
