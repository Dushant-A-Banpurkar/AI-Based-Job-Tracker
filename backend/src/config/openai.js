import OpenAI from "openai";
import env from "../config/env.js";
const gemini_base_url = env.geminiBaseUrl;
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const gemini = new OpenAI({
  baseURL: gemini_base_url,
  apiKey: env.geminiApiKey,
});
