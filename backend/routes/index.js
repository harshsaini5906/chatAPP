import userRoutes from "./userRoutes.js";
import messageRoute from "./messageRoute.js"
import express from "express";
 
const routes=express();
routes.use("/user",userRoutes);
routes.use("/message",messageRoute);

export default routes;