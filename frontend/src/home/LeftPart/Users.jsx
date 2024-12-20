import React ,{useEffect,useState} from "react";
import User from "./User.jsx";


function Users(props) {
  const {otherData}=props;
  const [userList ,setUser]=useState([])
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
  return (
  <div className="h-[76%]  overflow-scroll scrollbar-hide">
      <h1 className=" sticky top-0 z-50 text-white p-1 pl-4 bg-slate-900">Messages</h1>
       
       
      <div >
        {
          userList.length === 0 ? (
        <p className="text-red-500">No user found</p>
          ): (  
            userList.map((item)=>{
              
             return <User key={item._id} user={{name:item.name,email:item.email}}/>
            })
           )
        }
      
    
      </div>
      {/* <div >
        {
          otherData.length === 0 ? (
        <p className="text-red-500">No user found</p>
          ): (  
            otherData.map((item)=>{
              
             return <User key={item._id} user={{name:item.name,email:item.email}}/>
            })
           )
        }
      
    
      </div> */}


    </div>

  );
}

export default Users;
