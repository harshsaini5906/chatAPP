import express from "express";
import {userRegister,userLogin ,userDetailBasedOnEmail} from "../controller/userController.js"
const route=express.Router();

route.post("/userRegister",userRegister);
route.post("/userLogin",userLogin);
route.post("/userDetailBasedOnEmail",userDetailBasedOnEmail);



export default route;