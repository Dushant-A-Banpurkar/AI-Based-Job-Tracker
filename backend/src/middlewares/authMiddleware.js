import jwt from "jsonwebtoken"
import env from "../config/env";


const verifySupabaseToken=(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split('Bearer ')[1];
        if(!token){
            return res.status(401).json({error:"No token provided!!!"})
        }
        const decoded=jwt.verify(token,env.supabase);
        req.user={
            id:decoded.sub,
            email:decoded.email
        }
        next()
    } catch (error) {
        console.error("Something Wrong In Authmiddlware",error);
        return res.status(401).json({error:"Auth middleware Error",details:error.message})
    }
}

export default verifySupabaseToken;