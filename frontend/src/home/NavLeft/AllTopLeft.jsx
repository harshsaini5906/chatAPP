import { IoChatboxSharp } from "react-icons/io5";
import { SiStatuspage } from "react-icons/si";
import { RiUserCommunityFill } from "react-icons/ri";
import { MdCircleNotifications } from "react-icons/md";
import React from 'react'

export const AllTopLeft = () => {
  return (
    <div className=' h-96 flex flex-col w-16 '>
        <div className='flex justify-center items-center   cursor-pointer text-gray-900 text-2xl mt-6 hover:text-green-500 scale-100'><IoChatboxSharp /></div>
        <div className='flex justify-center items-center   cursor-pointer text-gray-900 text-2xl mt-6 hover:text-green-500 scale-100'><SiStatuspage /></div>
         <div className=' flex justify-center items-center cursor-pointer text-gray-900 text-2xl mt-6 hover:text-green-500 scale-100'><RiUserCommunityFill /></div> 
         <div className=' flex justify-center items-center cursor-pointer  mt-6'><img src='https://static.whatsapp.net/rsrc.php/v4/ye/r/W2MDyeo0zkf.png' alt="hh" className="h-6"/></div> 
         <div className=' flex justify-center items-center cursor-pointer text-gray-900 text-3xl mt-6 hover:scale-100'><MdCircleNotifications />
         </div> 
         
    </div>
  )
}
