import React from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <div className="h-[12vh]">
      <div className="px-4 py-4">
        <form action="">
          <div className="text-black flex space-x-3">
            <label className=" bg-slate-900 text-white input input-bordered flex items-center gap-2 w-[80%]">
              <input
                type="text"
                className="grow p-2 bg-slate-900"
                placeholder="Search"
              />
            </label>

            <button className="">
              <FaSearch className="text-white text-5xl p-3  hover:bg-slate-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
