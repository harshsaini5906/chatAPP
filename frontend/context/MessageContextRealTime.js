import React ,{useContext, useEffect} from 'react'
import {SocketContext} from "./SocketContext.js";
import {chatContext} from "./ChatContext.js";



export const MessageContextRealTime = () => {
    const {result,setResult} =useContext(chatContext);
    // console.log("result===>>",result)
    const {sockets}=useContext(SocketContext);
    // console.log("sockets in message real time",sockets);


    useEffect(()=>{
        sockets.on("newMessage",(data)=>{
            console.log("new message send====>>>",data);

            setResult((prevResult) => {
        // Ensure prevResult is an array before spreading
        const updatedResult = {
            ...prevResult, // Copy the existing result object
            message: Array.isArray(prevResult.message) 
              ? [...prevResult.message, data] // Push the new message
              : [data], // If messages doesn't exist or isn't an array, create a new array with the data
          };
          console.log("Updated result:", updatedResult);
          return updatedResult;
      });
        })

        sockets.on("senderNewMessage",(data)=>{
          // console.log("new message send====>>>",data);

          setResult((prevResult) => {
      // Ensure prevResult is an array before spreading
      const updatedResult = {
          ...prevResult, // Copy the existing result object
          message: Array.isArray(prevResult.message) 
            ? [...prevResult.message, data] // Push the new message
            : [data], // If messages doesn't exist or isn't an array, create a new array with the data
        };
        // console.log("Updated result:", updatedResult);
        return updatedResult;
    });
      })
        // console.log("resultttttttttttttttttttttttttttttt===>>",result)
        return () => {
            if (sockets) {
              sockets.off('newMessage');
            }
          };

 },[sockets,setResult])
  
}
