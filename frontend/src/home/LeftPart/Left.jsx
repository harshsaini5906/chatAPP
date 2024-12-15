import React from "react";
import Search from "./Search.jsx";
import Message from "./Users.jsx";
import Logout from "./Logout.jsx";

function Left() {
  return (
    <div className="w-[30%] border border-white bg-black">
      <Search />
      <Message />
      <Logout/>

    </div>
  );
}

export default Left;
