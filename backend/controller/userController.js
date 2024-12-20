import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//********************user register API**************************/
export const userRegister = async (req, res) => {
  try {
    const { fullname, email, password, number, profileImage } = req.body;

    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res
        .status(400)
        .json({ status: 400, error: "user already register with this email" });
    }
    const newUser = new userModel({
      name: fullname,
      email: email,
      password: password,
      contactNumber: number,
      // profileImage:profileImage
    });
    await newUser.save();
    res.status(200).json({
      status: 200,
      resmessage: "Congratulation user register with chatApp",
      newUser,
    });
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//************************userLogin API************************ */
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({
      email: email,
      password: password,
    });
    if (existUser) {
      const token = jwt.sign(
        { userId: existUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
      );

      res.cookie("token", token, {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production (requires HTTPS)
        maxAge: 5 * 60 * 60 * 1000, // Cookie expiry time (5 hours in milliseconds)
        // signed: true       // Enable signed cookies (to prevent tampering)
      });
      const updateToken = await userModel.updateOne(
        { _id: existUser._id },
        { $set: { token: token } }
      );

      return res.status(200).json({
        status: 200,
        resmessage: "user login successfull",
        existUser,
        updateToken,
      });
    } else {
      return res.status(400).json({ resmessage: "user not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//***************************userDetail******************************/
export const userDetail = async (req, res) => {
  try {
    // const { user_id}=req.body;
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ error: "token not found" });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = await userModel.findOne(
      { _id: tokenData.userId },
      { name: 1, email: 1, profileImage: 1, contactNumber: 1 }
    );
    if (existUser) {
      return res.status(200).json({
        status: 200,
        resmessage: "userDetail fetch successfully",
        existUser,
      });
    } else {
      return res.status(402).json({ resmessage: "No user detail found" });
    }
  } catch (err) {
    console.log("somethig went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//********************************************************************** */
export const userDetailBasedOnEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // const token = req.headers.token;
    // if (!token) {
    //   return res.status(400).json({ error: "token not found" });
    // }
    // const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = await userModel.findOne(
      { email: email },
      { profileImage: 1, email: 1 }
    );
    if (existUser) {
      return res.status(200).json({
        status: 200,
        resmessage: "userDetail fetch successfully",
        existUser,
      });
    } else {
      return res.status(402).json({ resmessage: "No user detail found" });
    }
  } catch (err) {
    console.log("somethig went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//******************user profile image upload API*************************/
export const profileUpload = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ error: "token not found" });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const { profileImgageURl } = req.body;
    if (!profileImgageURl) {
      return res.status(401).json({ error: "no profile image url found" });
    }
    const uploadData = await updateOne(
      { _id: tokenData.userId },
      { $set: { profileImage: profileImgageURl } }
    );
    if (uploadData) {
      return res.status(200).json({
        status: 200,
        resmessage: "profile image upload successfully",
        uploadData,
      });
    } else {
      return res.status(402).json({ error: "profile not upload successfull" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    return res.status(500).json({ resmessage: "Internal server error" });
  }
};

//**********************user list ******************************/
export const userList = async (req, res) => {
  try {
    const userlist = await userModel.find({});

    if (userlist.length > 0) {
      return res
        .status(200)
        .json({
          status: 200,
          resmessage: "userList fetch successfully",
          userlist,
        });
    } else {
      return res
        .status(400)
        .json({ status: 400, resmessage: "user list not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};


//******************search user ***************** */
export const searchUser = async (req, res) => {
  try {
    const { name } = req.body;
    const userlist = await userModel.find({ name: new RegExp(name ,'i') ,});
    if (userList.length > 0) {
      return res
        .status(200)
        .json({
          status: 200,
          resmessage: "user list based on search",
          userlist,
        });
    } else {
      return res
        .status(400)
        .json({ status: 400, resmessage: "user not found based on name" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

export {};
