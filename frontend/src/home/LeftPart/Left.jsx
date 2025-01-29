import React from "react";
import Search from "./Search.jsx";
import Alluser from "./Users.jsx";


function Left() {
  return (
    <div className="w-[30%] border border-white bg-white">
      <Search />
      <Alluser />
      {/* <Logout/> */}

    </div>
  );
}

export default Left;
