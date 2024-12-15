import React from "react";

import { BiSolidLogOutCircle } from "react-icons/bi";
function Logout() {
  return (
    <div className="h-[12vh] ">
      <div className="px-4 py-4 float-end mr-4">
        <button >
      <BiSolidLogOutCircle className="text-white text-6xl p-3   hover:bg-slate-600 rounded-full duration-300 ease-linear"  />
        </button>
      </div>
    </div>
  );
}

export default Logout;
