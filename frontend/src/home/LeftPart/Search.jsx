import React,{useState,} from "react";
import Users from '../LeftPart/Users.jsx'
import { FaSearch } from "react-icons/fa";

function Search() {
  const [inputValue,setInputValue]=useState([]);
  const handleClick=(event)=>{
    const value=event.target.value;
    setInputValue(value);
    // console.log("value====>>",value);
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
        }
       })}catch(err){
        console.log(err);
       }
  }

  return (
    <div className="h-[12vh]">
      <div className="px-4 py-4">
        <form action="">
          <div className="text-black flex space-x-3">
            <label className=" bg-slate-900 text-white input input-bordered flex items-center gap-2 w-[80%]">
              <input
                type="text"
                className="grow p-2 bg-slate-900"
                placeholder="Search"
                onChange={handleClick}
              />
            </label>

            <button type="button">
              <FaSearch onClick={submitFunction} className="text-white text-5xl p-3  hover:bg-slate-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
        {/* <Users searchData={inputValue}/> */}
      </div>
    </div>
  );
}

export default Search;
