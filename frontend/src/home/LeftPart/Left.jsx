import React from "react";
import Search from "./Search.jsx";
import Alluser from "./Users.jsx";
import Logout from "./Logout.jsx";

function Left() {
  return (
    <div className="w-[30%] border border-white bg-black">
      <Search />
      <Alluser />
      <Logout/>

    </div>
  );
}

export default Left;
