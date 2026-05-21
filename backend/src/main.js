import express from "express";
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
    origin:[ "http://localhost:4000","https://ai-based-job-tracker-frontend.vercel.app","https://ai-based-job-tracker-frontend-gkhw3me4r.vercel.app/"],
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

app.use("/api/pdf", pdfRoute);
app.use("/api/analysis", analysis);
app.use("/api/auth", auth);
app.use("/api/application", application);

app.listen(env.port, () => {
  console.log(`Server is ruuning on ${env.port} port`);
  connectMongoDB();
});
