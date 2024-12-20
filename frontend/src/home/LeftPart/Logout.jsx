import React from "react";
import {useNavigate} from "react-router-dom"
import Login from '../../components/Login.jsx'

import { BiSolidLogOutCircle } from "react-icons/bi";
function Logout(props) {
  const navigate=useNavigate();
  const handleClick=()=>{
     navigate("/Login")
  }
  return (
    <div className="h-[12vh] ">
      <div className="px-4 py-4 float-end mr-4">
        <button >
      <BiSolidLogOutCircle onClick={handleClick} className="text-white text-6xl p-3   hover:bg-slate-600 rounded-full duration-300 ease-linear"  />
        </button>
      </div>
    </div>
  );
}

export default Logout;
