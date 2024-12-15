import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "../components/Login.jsx"
import Left from "../home/LeftPart/Left.jsx"
import Right from "../home/RightPart/Right.jsx"
import Signup from "../components/Signup.jsx"

import React,{useState} from 'react'

function Routes() {
 
 const [isAuthenticate,setAuthenticate]=useState(false);

//  const setTrue=(data)=>{
//    setAuthenticate(data);
//  }
// console.log("==>>",setAuthenticate)
    const routes=createBrowserRouter([
        {
            path:"/",
            element: isAuthenticate ? <div className="flex h-screen">
             <Left/>
             <Right/>
            </div> : <Login  setAuthenticate={setAuthenticate} isAuthenticate={isAuthenticate}/>
        },
        {
            path:"/login",
            element: <Login/>,
            // element: <Login setAuthenticate={setAuthenticate} isAuthenticate={isAuthenticate}/>,
            // children:{
            //     path:"/signup",
            //     element:<Signup/>
            // }
        },
        {
            path:"/signup",
            element:<Signup/>
        }
     ])


  return (
    <RouterProvider router={routes}>

    </RouterProvider>
  )
}

export default Routes


//  export {routes}