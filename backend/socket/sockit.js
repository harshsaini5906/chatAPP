import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express();

const server=http.createServer(app);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  
// console.log("io>>>",io)
let users={}

export const getRecieverSocketId=(recieverId)=>{
      return users[recieverId] 
}

io.on('connection',(socket)=>{
    // console.log("user connected successfully",socket.id);
    const userId=socket.handshake.query.userId;
    users[userId]=socket.id
    // console.log("login user id>>>>>>",userId)
    // console.log("users ===>>>",users);

    io.emit("newUserOnline",Object.keys(users));

    socket.on('typing',(payload)=>{
      console.log("on typing ===>>",payload);
      const {receiverId,senderId}=payload;
      console.log("recieverId<<<",receiverId)
      let recieverSockitid= getRecieverSocketId(receiverId)
      console.log("===reviever sockit id====>>",recieverSockitid)
      io.to(recieverSockitid).emit("typing",{user:senderId})
    })

    socket.on("disconnect",()=>{
        console.log("user diconnected!");
        delete users[userId];
        io.emit("newUserOnline",Object.keys(users));
        console.log("users after disconnect===>>",users)
    })
    
})
 


export {server,app,io}