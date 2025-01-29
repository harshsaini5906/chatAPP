import React ,{useContext,useMemo,useState} from 'react';
import { chatContext } from '../../../context/ChatContext';
import {SocketContext} from "../../../context/SocketContext";


function User(props) {
  const {name,email,recieverId}=props.user
  const {setSelectUser,selectUser,result,setSearch}=useContext(chatContext);
 const {onlineUser}=useContext(SocketContext);
 
  // console.log("===>>",name,email,recieverId)
  // console.log("user select on click",selectUser)
 
  

  const handleUserClick = () => {
      setSelectUser(props.user); // Update selected user in context when clicked
      // console.log("User selected:", props.user); // Debugging purpose
      setSearch()
      
  }
  const isActive= selectUser && selectUser.recieverId === recieverId
  //  console.log("isAcitve",isActive)
    const isOnline=onlineUser.includes(recieverId);
    // console.log("is online====>>",isOnline);
    const names= name.split(' ').map((item)=>{ return item.charAt(0).toUpperCase()+item.slice(1).toLowerCase()}).join(' ')
  return (
    <div className='border-l-0 border-r-0 border-t-0 border-b-2 border-gray-200'>

    <div onClick={handleUserClick} style={{background:isActive ? "RGB(220, 252, 231)":""}} className="flex space-x-4  px-4 py-2 hover:bg-green-50 duration-300 cursor-pointer mt-1 mb-1 ">
    <div className={`avatar ${isOnline ? "online" : ""}`}>
      <div className="w-14 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <div className="text-black ">
      <h1 className='font-medium  text-black'>{names}</h1>
      <span className='text-black font-normal text-[80%]'>{email}</span>
    </div>
  </div>

  </div>
  )
}

export default User