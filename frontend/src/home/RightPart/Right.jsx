import React,{useContext} from 'react'
import RightTopNav from './RightTopNav.jsx'
// import Allmessage from './Allmessage.jsx'
import { FaMessage } from "react-icons/fa6";
import Message from './Message.jsx'
import SendBottom from './SendBottom.jsx'
import SearchBox from './SearchBox.jsx'
import { ClickProfile } from './ClickProfile.jsx';
import { chatContext } from '../../../context/ChatContext.js'
// import { ChatContextProvider } from '../../../context/ChatContextProvider.jsx';
function Right() {
  const {selectUser,showSearch}=useContext(chatContext);
  console.log("====selec",showSearch)
  return <>
  <div className='w-[70%] bg-green-50 text-black h-[100%] '>
  {selectUser ? (
        <div className='flex  h-[100%]'>
        <div className={`${showSearch === "search" ? "w-[60%]" : "w-full"} `}>
          <RightTopNav />
          <Message/>
          <SendBottom/>
        </div>
        <div className={`${showSearch === "search" ? "w-[40%]" : "" || showSearch === "profile" ? "w-[68%]" : ""}`}>
          {showSearch === "search" && <SearchBox /> ||
           showSearch === "profile" && <ClickProfile />}
        </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full text-lg bg-gray-200">
          <FaMessage className='text-4xl mb-2 animate-bounce' />
        <p>Please select a chat to start messaging</p>
        </div> // Agar selectedUser nahi hai, to khali div show hoga
      )}
  </div>
  </>
  
  
}

export default Right