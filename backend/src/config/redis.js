import Redis from "ioredis"
import env from "./env.js"

const redis=new Redis(env.redisUrl,{
    family:0
});
redis.on("connect",()=>console.log("Redis Connected"));
redis.on("error",(err)=>console.error("Redis Error",err));

export default redis;