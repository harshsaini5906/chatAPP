import React ,{useContext} from "react";
import {useNavigate} from "react-router-dom"
import Login from '../../components/Login.jsx'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { SocketContext } from "../../../context/SocketContext.js";
import { UserContext } from "../../../context/UserContext.js";

import { BiSolidLogOutCircle } from "react-icons/bi";
function Logout() {
  const {sockets}=useContext(SocketContext)

  const navigate=useNavigate();
  const handleClick=()=>{
    toast.success("Logout Successfull!")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    if (sockets) {
              sockets.disconnect();
            
          }
    setTimeout(()=>{
      navigate("/Login")

    },1000)
  }
  return (
    <div className="items-center justify-center  flex cursor-pointer h-10 ">
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Zoom} />
      
        <button className="text-4xl"  >
      <BiSolidLogOutCircle onClick={handleClick} className="text-green-600  "  />
        </button>
     
    </div>
  );
}

export default Logout;
