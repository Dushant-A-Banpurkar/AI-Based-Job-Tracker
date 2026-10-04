import rateLimit from 'express-rate-limit';

export const rateLimiter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{
        error:"To many resume analyzed. Try again after 15 minutes"
    },
    standardHeaders:true,
    legacyHeaders:false
})

export const analysisRateLimiter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{
        error:"Too many resume analyses. Try again after 15 minutes"
    },
    standardHeaders:true,
    legacyHeaders:false
})