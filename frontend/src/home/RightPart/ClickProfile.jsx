import React ,{useContext}from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdThumbDownAlt } from "react-icons/md";
import { GiLoveMystery } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { chatContext } from '../../../context/ChatContext';
import {SocketContext} from "../../../context/SocketContext";
export const ClickProfile = () => {
    const { selectUser,setSearch,showSearch}=useContext(chatContext);
    const { onlineUser,isTyping,isTyping2}=useContext(SocketContext);
    
    const handleProfileClick=()=>{
        setSearch()
    }
    const isOnline=onlineUser.includes(selectUser.recieverId)          
    const isType=isTyping.includes(selectUser.recieverId)
   const name= selectUser.name.split(' ').map((item)=>{ return item.charAt(0).toUpperCase()+item.slice(1).toLowerCase()}).join(' ')
    
  return (
     <div className="flex flex-col h-[100%]  bg-green-50 p-4 overflow-auto ">
          <div className="h-20 items-center w-full space-y-3">
                  <div className='flex justify-items-center items-center  pt-2 '>
                      <button onClick={handleProfileClick} className=' text-black rounded-md pl-2 pr-2 text-3xl font-light'><IoCloseSharp /></button>
                      <h2 className='ml-[20%] font-medium text-black'>Profile Section</h2>
                  </div>
        
                </div>
                <div className="avatar h-[30%] w-full flex justify-center bg-white p-2 ">
               <div className=" rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div className='w-full h-20 flex justify-center flex-col items-center pt-2 pb-1 bg-white' >
          <h1 className="font-normal text-black">{name}</h1>
          <h1 className="font-normal text-black ">{selectUser.email}</h1>
          <h1 className="font-normal text-green-700 text-xs">{ isType && isTyping2 ? "typing..." : isOnline ? "online" : ""}</h1>
        </div>
        <div className='w-full  flex flex-col pl-3 pr-2 pt-2 pb-1 mt-2 bg-white' >
          <h1 className="font-normal text-black">About</h1>
          <p className="font-normal text-slate-500 pt-1 ">The permanent address for a daughter is her parent's heart ❤️❤️</p>
        </div>
       
        <div className='w-full h-30 mt-2 flex justify-center flex-col items-center pt-2 pb-1 bg-white' >
          <div className='w-full cursor-pointer p-2'><div className='  flex'><GiLoveMystery className='  h-9 w-6 text-red-700 mr-4'/><h1 className=" text-black font-medium items-center pt-1">Add to favourites</h1></div></div>
          <div className='w-full cursor-pointer p-2'><div className='  flex'><MdBlock  className='  h-9 w-6 text-red-700 mr-4'/><h1 className=" text-red-600 font-medium items-center pt-1">Block {name}</h1></div></div>
          <div className='w-full cursor-pointer p-2 '><div className='  flex'><MdThumbDownAlt  className='  h-9 w-6 text-red-700 mr-4'/><h1 className=" text-red-600 font-medium items-center pt-1">Report {name}</h1></div></div>
          <div className='w-full cursor-pointer p-2 '><div className='  flex'><RiDeleteBin5Fill className='  h-9 w-6 text-red-700 mr-4'/><h1 className=" text-red-600 font-medium items-center pt-1">Delete Chat</h1></div></div>

        </div>
       
       
    
      </div>
    

  )
}
