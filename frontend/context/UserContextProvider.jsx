import React ,{useState} from "react";
import { UserContext  } from "../context/UserContext.js"
export const UserContextProvider=({children})=>{
    const [login,setLogin]=useState("")

    return(
<UserContext.Provider value={{login , setLogin}}>
    {children}
</UserContext.Provider>
    )

}