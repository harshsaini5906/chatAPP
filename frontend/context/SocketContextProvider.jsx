import React, { Children, useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext.js";
import { chatContext } from "./ChatContext.js";
import { io } from "socket.io-client";

export const SocketContextProvider = ({ children }) => {
  const { login } = useContext(UserContext);
  const {setResult}=useContext(chatContext)
//   console.log("======>>>>>><<<<<<<<<<<<", login);
  const [sockets, setSocket] = useState();
  const [onlineUser,setOnlineUser]=useState([]) 
  const [isTyping,setTyping]=useState([])
  const [isTyping2,setTyping2]=useState()
    
    console.log("====is typing=+++++++>>>",isTyping)
    // console.log("online users====>>>",onlineUser);
    
    
  const socketInitialize = () => {
    let socketInstance = io("http://localhost:3000",{
        query:{
            userId:login._id
        }
    });

    // connection with server
    socketInstance.on("connect", () => {
        console.log("Connected to Server");
    });
    setSocket(socketInstance);
    socketInstance.on("newUserOnline",(data)=>{
        // console.log("data====>>",data)
        setOnlineUser(data)
    })
    socketInstance.on("typing",(payload)=>{
      // console.log("=============typings=======",payload);
      if (payload.user !== login._id) {
        // setTypingUser(data.user);
        setTyping(Object.values(payload));
        setTyping2(true);
        setTimeout(() => {
          setTyping2(false);
        }, 3000); // Hide typing indicator after 3 seconds
      }
    })

    return () => socketInstance.off("typing");
   
  };

  useEffect(()=>{
    if(login){
        socketInitialize();
    }else{
        if(sockets){
            sockets.close();
            setSocket(null)
        }
    }
    return () => {
        if (sockets) {
            sockets.disconnect();
             
        }
    };
  },[login]);

  return (
    <SocketContext.Provider value={{ sockets, setSocket,onlineUser,isTyping ,isTyping2}}>
      {children}
    </SocketContext.Provider>
  );
};
