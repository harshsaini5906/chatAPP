import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [isdisabled,setdisabled]=useState(false);
  const { register,handleSubmit,formState:{errors}}=useForm()
  // const {isSubmitting,submitting}=useState(false);
    const navigate=useNavigate()

  const onSubmit=async(data)=>{
    if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
      <div className="text-black border border-red-100 rounded-md">
      </div>
      return;
    }
    // console.log("==data===>>>>",data);
    const formData={
    fullname:data.fullname,
    email:data.email,
    password:data.password,
    profileImage:data.profileImage
    // formData.confirmPassword=data.confirmPassword
    }

  //  console.log("====>>>",formData)
  try{
    await fetch('http://localhost:3000/user/userRegister',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res)=>{
      // console.log("api res===",res);
      if(res.status == 400){
        return alert("user already register with this email");
        
      }
      alert("user register successfully");
      setdisabled(true);    // is used to diabled the button after successfull register the user
      setTimeout(()=>{
        setdisabled(false)
        
      },2000);
      if(res.status == 200){
        navigate("/login")
      }
  
    })
   
    
  }catch(err){
    console.log("error= in API==>>>",err);
  }



  }
  return (
    <div className="h-screen w-full bg-gray-950 flex justify-center items-center">
      <div className="border border-gray-600 rounded-lg w-[35%] h-[60%] p-4">
        <h1 className="font-bold text-center text-gray-300 mb-3">
          Chat <span className="text-[#0AC92B]	">App</span>
        </h1>
        <h1 className="text-white font-bold pl-2 mb-2">Signup</h1>

        <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
          <div className="flex flex-col">
            <input
              className="border-2 bg-gray-950 m-1 p-2 pl-3 rounded-md border-gray-500 text-white"
              type="text"
              placeholder="Fullname"
              {...register("fullname",{required:"Please enter the fullname!"})}
              />
              <p className="text-red-500">{errors.fullname?.message}</p>
            <input
               className="border-2 bg-gray-950 m-1 p-2 pl-3 rounded-md border-gray-500 text-white"
               type="text"
               placeholder="Email"
               {...register("email",{required:"Please enter the email!",
                pattern: {
                    value: /^[A-Za-z0-9._+]+@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email!"
                  }
               },
                
               )}
            />
              <p className="text-red-500">{errors.email?.message}</p>
            <input
              className="border-2 bg-gray-950 m-1 p-2 pl-3 rounded-md border-gray-500 text-white"
              type="password"
              placeholder="Password"
              {...register("password",{required:"Please enter password!",
                minLength:{value:5,message:"Password must be at least 5 characters long"}
              })}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            <input
               className="border-2 bg-gray-950 m-1 p-2 pl-3 rounded-md border-gray-500 text-white"
               type="text"
               placeholder="Confirm Password"
               {...register("confirmPassword",{required:"Please enter confirm password!"})}
            />
              <p className="text-red-500">{errors.confirmPassword?.message}</p>

              <input
               className="border-2 bg-gray-950 m-1 p-2 pl-3 rounded-md border-gray-500 text-white"
               type="file"
               placeholder="Select profile image"
               {...register("profileImage")}
            />
          </div>
        
        <div className="flex space-x-3 justify-between mt-2 ml-1 mr-1">
          <div>
            <h1 className="text-gray-300">
              Have an account?{" "}
              <span className="text-blue-800 ">
                <button className="underline" onClick={()=>{navigate("/login")}}>Login</button>
              </span>
            </h1>
          </div>
          <div className="text-white p-1 rounded-md  bg-[#0AC92B]">
            <button disabled={isdisabled}>Signup</button>
          </div>
        </div>
        </form>


      </div>
    </div>
  );
}

export default Signup
