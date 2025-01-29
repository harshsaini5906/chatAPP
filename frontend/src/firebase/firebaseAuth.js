import {auth} from "../firebase/firebaseConfig"
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth"
const provider=new GoogleAuthProvider()




//function for authentication that will be called when we click on google login button in login page
export const googleSignFunction=async()=>{
    try{
     const result=await signInWithPopup(auth,provider)
     console.log("result of googleSignFunction==>>>==>>",result);
    }catch(err){
        console.log("something went wrong in googleSignFunction",err);
    }
}
