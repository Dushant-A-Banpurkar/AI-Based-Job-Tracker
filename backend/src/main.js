import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pdfRoute from "./routes/pdf.js";
import analysis from "./routes/analysis.js";
import auth from "./routes/auth.js";
import application from "./routes/application.js";
import env from "./config/env.js";
import connectMongoDB from "./config/database.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://ai-based-job-tracker.vercel.app",
      "https://ai-based-job-tracker-frontend.vercel.app",
      "https://frontend-of-ai-based-job-tracker.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log("GLOBAL LOGGER - method:", req.method, "path:", req.path, "content-type:", req.headers["content-type"]);
//   console.log("GLOBAL LOGGER - raw body (may be undefined if not parsed):", req.body);
//   next();
// });
app.get("/", (req, res) => {
  res.status(200).send("Server is awake");
});

app.get("/ready", (_req, res) => {
  const mongoReady = mongoose.connection.readyState === 1;
  res.status(mongoReady ? 200 : 503).json({
    status: mongoReady ? "ready" : "not_ready",
    checks: {
      mongodb: mongoReady ? "connected" : "disconnected",
    },
  });
});

app.use("/api/pdf", pdfRoute);
app.use("/api/analysis", analysis);
app.use("/api/auth", auth);
app.use("/api/application", application);

app.listen(env.port, () => {
  console.log(`Server is ruuning on ${env.port} port`);
  connectMongoDB();

  const renderUrl = env.render;
  const backupUrl=env.backupRender;
  setInterval(
    async () => {
      try {
        const response = await fetch(renderUrl);
        const response2=await fetch(backupUrl);
        console.log(`Keep-alive ping successful of Main Server: ${response.status}`);
        console.log(`Keep-alive ping successful of Main Server: ${response2.status}`);
      } catch (error) {
        console.error(`Keep-alive ping failed:`, error.message);
      }
    },
    14 * 60 * 1000,
  );
});
