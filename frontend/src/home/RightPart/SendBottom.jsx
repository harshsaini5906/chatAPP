import React from "react";
import { BiSend } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

function SendBottom() {
  return (
    <div className="h-[12vh] p-6 bg-slate-700  ">
      <div className="w-[100%] flex space-x-0">

        <div className=" flex justify-center items-center mr-3 hover:scale-125 duration-300 ">
          <button>
            <AiOutlinePlus className="text-white text-3xl" />
          </button>
        </div>

        <div className="w-[50%]">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered input-lg w-[100%] h-10 text-1xl text-black "
          />
        </div>

        <div className=" flex justify-center items-center">
          <button>
            <BiSend className="text-white text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendBottom;
