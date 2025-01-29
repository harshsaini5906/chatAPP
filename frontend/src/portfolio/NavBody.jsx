import React from "react";
import { Link } from "react-router-dom";

function NavBody() {
  return (
    <div className="h-screen w-full bg-[#4240a3]">

      <div className="flex   p-2 pt-4  justify-evenly ">
        <div className=" cursor-pointer text-white w-28 h-10 items-center flex justify-center">
          <h1 className="font-mono text-2xl ">harsh.in</h1>
        </div>
        <div className="space-x-12 w-[50%]  text-white text-2xl">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/news">News</Link>
          <Link to="/contactUs">Contact Us</Link>
        </div>
      </div>
     <div className="flex  h-[91%] w-full">

        <div className="border-2 border-red-400 w-[45%] flex flex-col justify-center items-center gap-4">
       <div className="w-[30%] text-1xl font-extrabold  text-white "><h1>MY NAME IS HARSH SAINI</h1></div>
       <div className="w-[30%] text-1xl font-extrabold text-white "><h1>I AM A CREATIVE</h1></div>
       <div className="w-[30%] text-1xl font-extrabold text-white"><h1> BACKEND DEVELOPER</h1></div>
       <div className="w-[30%] text-1xl font-extrabold text-white"><h1>FROM MUZAFFARNAGAR</h1></div>
        <div className="h-10 w-[30%] border-2 text-white flex justify-center items-center">
            <button >
                Contact Me
            </button>
        </div> {/*  text div */}
        </div>
        <div className="border-2 border-red-400 w-[55%] flex justify-center items-center ">
         <img src={img} alt="harsh" />   
        </div> {/*  image div */}
     </div>



    </div>
  );
}

export default NavBody;
