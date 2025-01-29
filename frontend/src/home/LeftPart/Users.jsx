import React ,{useEffect,useState,useContext} from "react";
import User from "./User.jsx";
import { chatContext } from "../../../context/ChatContext.js";


function Users(props) {
  // const {searchData=[]}=props
  // console.log("======responseData>>>",searchData.length)
  const [userList ,setUser]=useState([])
  const { searchUserList}=useContext(chatContext);
  
useEffect(()=>{
  const fetchuser =async()=>{
    await fetch("http://localhost:3000/user/userList",{
      method:"get",
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(async(result)=>{
      const response=await result.json()
      // console.log("===>>",response)
      if(response.status == 200){
      // console.log("user list>>",response);
      setUser(response.userlist);

      }else if (response.status == 400){
              // console.log(result);
      }
    })
  }
    fetchuser();    
},[])
// console.log("===use state=========>>",userList)
// console.log("search",searchData);
const userToDisplay=searchUserList.length > 0 ? searchUserList : userList 
// console.log("usertodisplay",userToDisplay)
const userId=localStorage.getItem("userId")
const filteredUsers = userToDisplay.filter(item => item._id !== userId);
  return (
  <div className="h-[76%]  overflow-scroll scrollbar-hide">
      <h1 className=" sticky top-0 z-50 text-black p-1 pl-4 bg-white">Messages</h1>
       
       
      <div >

        {
          filteredUsers.length === 0 ? (
        <p className="text-red-500">No user found</p>
          ): (  
            filteredUsers.map((item)=>{
              //  console.log("item",item)
            
             return <User key={item._id} user={{name:item.name,email:item.email,recieverId:item._id}}/>
            })
           )
        }
      
    
      </div>
    

    </div>

  );
}

export default Users;
