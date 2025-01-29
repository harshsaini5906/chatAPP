import React ,{useContext} from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { chatContext } from "../../../context/ChatContext";
import {SocketContext} from "../../../context/SocketContext";
import { FaVideo } from "react-icons/fa";

function RightTopNav() {
 
  const { selectUser,setSearch,showSearch}=useContext(chatContext);
  console.log("show search====>>",showSearch);
  
  const { onlineUser,isTyping,isTyping2}=useContext(SocketContext);  //used to remove the typing string after 3 second
  const isOnline=onlineUser.includes(selectUser.recieverId)          
  const isType=isTyping.includes(selectUser.recieverId)
 const name= selectUser.name.split(' ').map((item)=>{ return item.charAt(0).toUpperCase()+item.slice(1).toLowerCase()}).join(' ')
//  console.log("====>>>",name);
const handleSearchClick = () => {
  setSearch("search"); // Trigger search state change when the button is clicked
};
const handleProfileClick=()=>{
  setSearch("profile")
}

  return (
    <div className="w-full h-[10%] bg-green-100 pt-2 flex justify-between">
      <div className="flex space-x-3  w-40 justify-center items-center cursor-pointer" onClick={handleProfileClick}>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div >
          <h1 className="font-medium text-black">{name}</h1>
          <h1 className="font-normal text-green-700 text-xs">{ isType && isTyping2 ? "typing..." : isOnline ? "online" : ""}</h1>
        </div>
      </div>

      <div className=" flex space-x-2 w-50 items-center justify-evenly">
        <div>
          {/* video Button */}
        <button>
        <FaVideo   className="text-5xl opacity-60  cursor-not-allowed p-3 "/>
        </button>
        </div>

        
        <div >
          {/* Search Button */}
        <button onClick={handleSearchClick}>
        <IoSearchOutline  className="text-5xl text-black p-3 "/>
        </button>
        </div>

       <div>
       <button>
        <BsThreeDotsVertical className="text-5xl text-black p-3 " />
        </button>
       </div>
       
      </div>
    </div>
  );
}

export default RightTopNav;
