import * as dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRE = "7d",
  REDIS_URL,
  OPENAI_API_KEY,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  SUPABASE_JWT_SECRET,
  JWT_ALGORITHM = "HS256",
  NODE_ENV = "development",
} = process.env;

assert(MONGODB_URI, "MONGODB_URI is required");
assert(JWT_SECRET, "JWT_SECRET is required");
assert(OPENAI_API_KEY, "OPENAI_API_KEY is required");
assert(REDIS_URL,"Redis Url Required")

export default {
  port: Number(PORT) || 4000,
  mongodbUri: MONGODB_URI,
  jwt: { secret: JWT_SECRET, expire: JWT_EXPIRE },
  jwtAlgorithm: JWT_ALGORITHM,
  redisUrl:REDIS_URL,
  node: NODE_ENV,
  openaiKey: OPENAI_API_KEY,
  supabase:SUPABASE_JWT_SECRET,
  aws: { key: AWS_ACCESS_KEY, secret: AWS_SECRET_KEY, region:AWS_REGION,bucketname:AWS_S3_BUCKET},
  email: {
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};
