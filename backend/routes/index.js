import userRoutes from "./userRoutes.js";
import express from "express";
 
const routes=express();
routes.use("/user",userRoutes);

export default routes;