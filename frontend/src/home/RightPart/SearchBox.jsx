// SearchBox.js
import React, { useState,useContext, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import DatePicker from 'react-datepicker';
// import DatePicker from "react-datepicker";
// import { FaCalendarAlt } from "react-icons/fa";
 import {chatContext} from '../../../context/ChatContext'
function SearchBox() {
    const { selectUser,setSearch,showSearch}=useContext(chatContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState();
   console.log("searchQuery===>>>",showSearch)
   const token=localStorage.getItem("token");

   
const searchMessage=async()=>{
  try{
   const response= await fetch('http://localhost:3000/message/searchMessage',{
      method:"post",
      headers:{
        'content-Type':'application/json',
      token:token},
      body:JSON.stringify({recieverId:`${selectUser.recieverId}`,messages:searchQuery})
    })
    const result=await response.json();
   if(result.status ===  200){
    console.log("message send successfully",result);
    setSearchResult(result)
   }else{
    console.error("Failed to send message");
   }

  }catch(err){
    console.log("something wrong",err);
  }

}
useEffect(()=>{
  if(searchQuery.length >=2){
    searchMessage();

  }
},[searchQuery])




  // Handle input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchClick = () => {
    setSearch(); // Trigger search state change when the button is clicked
  };
  const name= selectUser.name.split(' ').map((item)=>{ return item.charAt(0).toUpperCase()+item.slice(1).toLowerCase()}).join(' ')

  const highlightText = (message) => {
    // Use regular expression to escape any special characters in the query and make it case-insensitive
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return message.split(regex).map((part, index) => 
      regex.test(part) 
        ? <span key={index} style={{ color: 'green', fontWeight: 'bold'  }}>{part}</span> 
        : part
    );
  };


  return (
    <div className="flex flex-col h-full bg-green-50 p-4">
      {/* Search Input */}
      <div className="h-28 items-center w-full space-y-3">
        <div className='flex justify-items-center items-center  pt-2 '>
            <button onClick={handleSearchClick} className=' text-black rounded-md pl-2 pr-2 text-3xl font-light'><IoCloseSharp /></button>
            <h2 className='ml-[20%] text-black'>Search Message</h2>
        </div>

        <div className='flex justify-center items-center space-x-6'>
            

        <div className='text-2xl cursor-pointer'>🗓️</div>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search message..."
          className="w-[80%] p-2 pl-6 pr-6 bg-transparent text-black bg-gray-400 placeholder:text-gray-100 rounded-full focus:outline-none"
          />
          </div>
      </div>
      <hr/>
      <div className='h-[80%] overflow-auto text-black'>
      {
        
      searchResult?.searchMessage && searchResult.searchMessage.length > 0 ? 
       searchResult.searchMessage.map((item, index) => (
        
        
      <div key={index} className=''>
        
        {/* Render your message item here, adjust based on the structure of `item` */}
        <div className='text-black text-[70%]'>{item.createdAt}</div>
        <div className='text-black border-2 border-t-0 border-l-0 border-r-0 border-gray-400 p-2'>{highlightText(item.message)}</div> {/* Example */}
      </div>
   )) : 
   <div className='flex items-center justify-center mt-10'>
      <h2 className='text-gray-500'>
        Search for messages with {name}
      </h2>
   </div>
}
</div>

    </div>
  );
}

export default SearchBox;
