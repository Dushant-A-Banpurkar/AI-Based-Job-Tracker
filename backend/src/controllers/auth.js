import UserData from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";
import redis from "../config/redis.js";
import env from "../config/env.js";

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    if (!firstname || !lastname || !email || !username || !password) {
      return res.status(400).json({ error: "All feild required!!" });
    }
    const exitingUser = await UserData.findOne({ email }).lean(); // Check Existing User from database
    if (exitingUser) {
      return res.status(400).json({ error: "Email arlreay exits" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserData.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });
    await generateTokenAndSetCookies(user._id, res);
    return res.status(200).json({
      message: "Account Created Successfully!!!.",
      data: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("SignUp Error", error);
    if (error.code === 11000) {
      return res.status(409).json({ error: "Duplicate field error" });
    }
    res.status(500).json({ error: "Server error: ", detials: error.message });
  }
};

export const update=async (req,res)=>{
  try {
    const {firstname,lastname,username}=req.body;
    const updateUserData=await UserData.findByIdAndUpdate(req.params.id,firstname,lastname,username,{
      new:true,
      runValidators:true
    });

  } catch (error) {
    
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserData.findOne({ email });
    // const isPassword = await bcrypt.compare(password, user.password);
    if (!user && !password) {
      res.status(400).json({ message: "Inavalid email and passsword" });
    }
    await generateTokenAndSetCookies(user._id, res);

    res.status(200).json({
      message: "Successfully SignIn!!!.",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error: ", details: error.message });
  }
};

export const getuserid = async (req, res) => {
  try {
    const user = req.user;
    
    if(!user){
      return res.status(404).json({error:"User not found"})
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error: ", details: error.message });
  }
};

export const logout = async (req, res) => {
  
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure:env.node !== "development"
    });
    const token=req.cookie?.jwt;
    if(token){
      const decoded=jwt.decoded(token);
      if(decoded?.userId){
        const redisKey=`session:${decoded.userId}`;
        console.log(`Deleting Redis session: ${redisKey}`);
        await redis.del(redisKey);
      }
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error: ", details: error.message });
  }
};
