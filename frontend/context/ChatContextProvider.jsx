import { chatContext } from "./ChatContext";
import React,{useState} from "react";

export const ChatContextProvider=({children})=>{
const [chat ,setChat]=useState("hii")
const [searchUserList,setSearchUserList]=useState([]);  // this used for search bar state management 
const [selectUser,setSelectUser]=useState("");
const [hitMessageApi,setMessageApi]=useState(false);
const [result,setResult]=useState({})  //used for set message after message api hit and sockit newmessage 
const [showSearch,setSearch]=useState() //show search bar when click on search button

// const handleSelectUser=(user)=>{
// setSelectUser(user)
// }
return(
    <chatContext.Provider value={{setSearch,showSearch,setChat, chat ,searchUserList, setSearchUserList,selectUser,setSelectUser,hitMessageApi,setMessageApi,setResult,result,}}>
        {children}  
    
    </chatContext.Provider>
)
}
// children refer to component that pass from the app.jsx