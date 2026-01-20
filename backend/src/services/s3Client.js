import {S3Client} from "@aws-sdk/client-s3";
import env from "../config/env.js";

const s3=new S3Client({
    region:(env.aws?.region).trim(),
    credentials:{
        accessKeyId:(env.aws?.key.trim()),
        secretAccessKey:(env.aws?.secret).trim(),
        
    }
});

export default s3;

