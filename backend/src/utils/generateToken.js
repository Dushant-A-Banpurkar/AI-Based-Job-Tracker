import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { mstonumber } from "../helper/mstoNumber.js";
import redis from "../config/redis.js";

export const generateTokenAndSetCookies =async (userId, res) => {
  try {
    const secret=env.jwt?.secret;
    const expiresIn=env.jwt?.expire || "7d";
    const algo=env.jwtAlgorithm || "HS256";
    console.log("🛠️ GENERATING TOKEN...");
    console.log("➡️ User ID Type:", typeof userId);
    console.log("➡️ User ID Value:", userId.toString());
    if(!secret|| typeof secret!=="string"){
        console.error("Invalid Screct Key: ",secret);
        throw new Error("Missing or Invalid JWT Secret")
    }
    const userIdString = userId.toString();
    const token = jwt.sign({ userId:userIdString }, secret, { algorithm: algo, expiresIn });
    const redisTTL=Math.floor(mstonumber(expiresIn)/1000);
    console.log(`➡️ Redis Key: session:${userIdString}`);
    console.log(`➡️ Redis TTL: ${redisTTL} seconds`);
    await redis.set(`session:${userIdString}`,token,"EX",redisTTL);
    const savedCheck = await redis.get(`session:${userIdString}`);
    console.log("➡️ Immediate Redis Check:", savedCheck ? "✅ SAVED OK" : "❌ SAVE FAILED");
    res.cookie("jwt", token, {
      maxAge: mstonumber(expiresIn),
      httpOnly: true, //prevent XSS attack cross-site scripting attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
      secure: env.node !== "development",
    });
  } catch (error) {
    console.error("JWT generation error: ",error.message);
    throw error;
  }
};
