import React,{useState,useContext} from "react";
import { chatContext } from "../../../context/ChatContext.js";
import Users from '../LeftPart/Users.jsx'
import { FaSearch } from "react-icons/fa";

function Search() {
  const [inputValue,setInputValue]=useState("");
  const {setSearchUserList}=useContext(chatContext)
  const handleClick=(event)=>{
    const value=event.target.value;
    setInputValue(value);
  }
  // console.log("input==>>",inputValue);
  
  const submitFunction=async()=>{
    try{
       await fetch("http://localhost:3000/user/searchUser",{
        method:'post',
        headers:{
          'content-Type':"application/json"
        },
        body: JSON.stringify({ name: inputValue}),
       }).then(async(result)=>{
        const response=await result.json();
        if(response.status == 200){
          console.log("response===>>",response);
         
          setSearchUserList(response.userlist)
          console.log("response userlist===>>",response.userlist);
        }
       })}catch(err){
        console.log(err);
       }
  }

  return (
    <div className="h-[12vh] bg-white flex flex-col ">
      <div className="w-full  p-0 pl-2"><h3 className="font-extrabold text-2xl">Chats</h3></div>

      <div className="mt-2 flex justify-center items-center w-full ">
        
          <div className="text-black flex space-x-3  bg-gray-300 w-[90%] rounded-full p-1">
           
              <input
                type="text"
                className="text-black w-96  rounded-full rounded-r-none pl-6 border-none bg-gray-300 focus:outline-none"
                placeholder="Search"
                onChange={handleClick}
              />
            

            <button type="button">
              <FaSearch onClick={submitFunction} className="text-black  duration-300 h-8 w-6 p-1 " />
            </button>
          </div>
       
       
      </div>
    </div>
  );
}

export default Search;
