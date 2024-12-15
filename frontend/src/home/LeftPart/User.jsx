import React from 'react'

function User() {
  return (
    <div>

    <div className="flex space-x-4  px-4 py-2 hover:bg-slate-700 duration-300 cursor-pointer">
    <div className="avatar online">
      <div className="w-14 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <div className="text-white">
      <h1 className='font-bold'>Harsh</h1>
      <span>harshsaini661@gmail.com</span>
    </div>
  </div>

  </div>
  )
}

export default User