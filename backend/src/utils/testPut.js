// import s3 from "../services/s3Client";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import env from "../config/env.js";
// (async()=>{
//     try {
//         console.log("Testing Test Put",env.aws?.bucketname,'region',env.aws?.region)
//         const cmd=new PutObjectCommand({
//             Bucket:env.aws?.bucketname,
//             Key:`test${Date.now()}.txt`,
//             Body:"Hello From S3 testput code",
//             ContentType:'text/plain'
//         });
//         const resp=await s3.send(cmd);
//         console.log('TEST PUT OK ',resp)
//     } catch (error) {
//         console.log('TEST PUT ERROR',error)
//     }
// })