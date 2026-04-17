import jwt from "jsonwebtoken";
import UserData from "../models/userModel.js";
import env from "../config/env.js";
import redis from "../config/redis.js";

export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No tokens provided" });
    }
    const decoded = jwt.verify(token, env.jwt?.secret);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid tokens provided" });
    }
    const redisKey=`session:${decoded.userId}`;
    console.log(`🔍 Checking Redis key:${redisKey}`)
    const sessionToken = await redis.get(redisKey);
    console.log("🔍 Redis found token:", sessionToken ? "YES" : "NO");
    console.log("🔍 Tokens match?", sessionToken === token);
    if (!sessionToken || sessionToken !== token) {
      return res
        .status(401)
        .json({ error: "Session expired or logged out. Please login again" });
    }
    const user = await UserData.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found!!!" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.details });
  }
};
