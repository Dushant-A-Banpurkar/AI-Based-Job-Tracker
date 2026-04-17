import OpenAI from "openai";
import env from "../config/env.js"
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
