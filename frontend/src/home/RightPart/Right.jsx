import React from 'react'
import RightTopNav from './RightTopNav.jsx'
import Allmessage from './Allmessage.jsx'
import SendBottom from './SendBottom.jsx'

function Right() {
  return <>
  <div className='w-[70%] border border-black bg-slate-900 text-white'>
    <RightTopNav/>
    <Allmessage/>
    <SendBottom/>
  </div>
  </>
  
  
}

export default Right