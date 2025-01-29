import React from "react";
import Logout from "../NavLeft/Logout.jsx";
import {Profile }from "../NavLeft/Profile.jsx"
import { AllTopLeft } from "./AllTopLeft.jsx";
export const OptionNavBar = () => {
  return (
    <div className="w-[5%] h-full bg-green-100 flex flex-col justify-between space-y-2 items-center text-end">
      <div>
      <AllTopLeft/>
      </div>
        <div className="mt-auto">
      <Profile />
      <Logout />
        </div>
    </div>
  );
};
