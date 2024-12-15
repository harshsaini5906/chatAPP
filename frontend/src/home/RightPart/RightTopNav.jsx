import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function RightTopNav() {
  return (
    <div className="w-full h-[8vh]  bg-slate-700  pt-2 flex justify-between">
      <div className="flex space-x-3  w-40 justify-center items-center">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div className="">
          <h1 className="font-bold">Harsh Saini</h1>
          <h1 className="font-normal text-green-400 text-xs">online</h1>
        </div>
      </div>

      <div className=" flex space-x-2 w-28 items-center justify-evenly">
        <div className="">
        <button>
        <IoSearchOutline className="text-5xl p-3 hover:bg-slate-600 rounded-full duration-300"/>
        </button>
        </div>
       <div>
       <button>
        <BsThreeDotsVertical className="text-5xl p-3  hover:bg-slate-600 rounded-full duration-300" />
        </button>
       </div>
       
      </div>
    </div>
  );
}

export default RightTopNav;
