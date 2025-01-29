import React, { useState,useEffect,useContext } from "react";
import loginImg from "../assets/img/login.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import {getFcmToken} from '../firebase/firebaseConfig.js'
import  {googleSignFunction}  from "../firebase/firebaseAuth.js"
function Login(props) {
  const {isAuthenticate,setAuthenticate}=props
  const {setLogin}=useContext(UserContext)
  const navigate=useNavigate()
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [generateToken, setGenerateToken] = useState(false);   //fcm token ke liye
  // const [fcmToken,setFcmToken]=useState();
  
  // useEffect(()=>{
  //   if(generateToken){
  //    const token= getFcmToken();   //used for generate the fcm token after successfull login.
  //    setFcmToken(token)
  //   }
  // },[generateToken])
 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

//

  const fetchData = async (Email,password,deviceToken) => {
    try {
      let response = await fetch("http://localhost:3000/user/userLogin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'token':"123456"
        },
        body: JSON.stringify({ email: Email,password:password ,deviceToken:deviceToken}),
      });
      // console.log("------------",await response.json());  // Handle the response properly
      const result = await response.json();
      // console.log("result===",result.existUser)
      if(result.status == 200){
        toast.success("Login Successfull");
        // setGenerateToken(true)   // Trigger FCM token generation function after successful login
        setTimeout(()=>{
          navigate('/')
          setAuthenticate(true)
          setLogin(result.existUser)
          // console.log("===============",result);
          localStorage.setItem("token",result.existUser.token);
          localStorage.setItem("userId",result.existUser._id);
         

        },1000)
      }else{
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.log("something went wrong in fetch the data based on email",err);
    }
  };
  
  
  
  
  
  const onSubmit = async(data) => {
    const token= await getFcmToken();
    console.log("token",token)
    fetchData(data.email,data.password,token);
    // console.log("=====>>>",data)
    

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted!');
      setIsSubmitting(false);  // Set isSubmitting back to false when done
    }, 2000);
  }
  return (
    <div className="h-screen w-full  bg-[#b5a7eb] flex justify-center items-center ">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Zoom} />
      <div className=" h-[70%] w-[30%] flex bg-[#2b2738] rounded-2xl">
        <div className="w-[100%]  flex justify-center items-center m-4 border border-gray-500 rounded-lg">
          <div className="h-[90%] w-[90%] ">
            <h1 className="font-sans text-[#f9f9f8] font-semibold text-2xl mb-2 text-center ">
              Login your account
            </h1>
            <h1 className=" text-[#777481] font-semibold text-center">
              Don't have account?{" "}
              <span className="underline text-[#706492] cursor-pointer"><button onClick={()=>{navigate("/signup")}}>Signup</button></span>
            </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-center">
                <div className="mt-10 mb-2 w-[80%]">
                <input
                  type="email"
                  placeholder="Email"
                  // onChange={handleInputChange}
                  className="w-full pl-3 h-10 rounded-md text-white border border-gray-600 bg-[#3b364c]"
                  {...register("email",{required:{value:true,message:"Please enter the email first!"},
                    //required: "Please enter the email first"
                    //React Hook Form treats it as the error message itself.

                    // pattern: {
                    //   value: /^[A-Za-z0-9._+]+@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/,
                    //   message: "Please enter a valid email"
                    // }
                      
                    

                  })}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="mt-2 mb-2 w-[80%] ">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-10 rounded-md text-white pl-3 bg-[#3b364c] border border-gray-600"
                {...register("password",{required:"Please enter password!",minLength:{value:2, message: "Password must be at least 2 characters long"}})}
               />
                <p className="text-red-500">{errors.password?.message}</p>
                {/* <IoEye className="text-white"/> */}
              </div>
              
              <div className="bg-[#6e54b5] w-[80%] mt-8 mb-2 rounded-md text-center cursor-pointer hover:bg-[#CB6396]  duration-300">
                <button className="text-gray-200 text-lg  h-10 w-full " disabled={isSubmitting}>{isSubmitting ? "Login..." : "Login"}</button>
              </div>
            </div>
                </form>
            <h1 className="text-white text-center mt-4"> Register with us <hr className="mt-1 w-[100%] border-dotted" /></h1>

            <div className="flex space-x-8  mt-6 justify-center items-center">

              <div onClick={googleSignFunction} className="border border-gray-600 p-2 rounded-lg w-[30%] gap-1 flex justify-center items-center cursor-pointer hover:bg-[#484063]">
                {<FcGoogle className=" "/>}
                <h1 className="text-gray-200">Google</h1>
              </div>

              <div className="border border-gray-600 p-2 rounded-lg w-[30%] gap-1 flex justify-center items-center cursor-pointer hover:bg-[#484063]">
                <FaApple className=" text-white "/>
                <h1 className="text-gray-200">Apple</h1>
              </div>
            </div>
        
          </div>
        </div>

        {/* <div className="w-[50%] m-4">
          <img
            src={loginImg}
            alt="img not found"
            className="h-[90%] w-[100%]"
          />
        </div> */}
      </div>
     
    </div>
  );
}

export default Login;
