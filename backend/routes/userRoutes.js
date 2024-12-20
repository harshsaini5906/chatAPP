import express from "express";
import {userRegister,userLogin ,userDetailBasedOnEmail,userList,searchUser} from "../controller/userController.js"
const route=express.Router();

route.post("/userRegister",userRegister);
route.post("/userLogin",userLogin);
route.post("/userDetailBasedOnEmail",userDetailBasedOnEmail);
route.get("/userList",userList);
route.post("/searchUser",searchUser);



export default route;