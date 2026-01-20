import path from "path";
import { extractTextFromArrayBuffer } from "../helper/pdfDataExtractor.js";
import fs from "fs";
import resumeData from "../models/resumeModel.js";
import s3 from "../services/s3Client.js";
import { PutObjectAclCommand } from "@aws-sdk/client-s3";
import env from "../config/env.js";

// export const uploadsingleFile = async (req, res) => {
//   try {
//     // console.log("headers:", req.headers);
//     // console.log("file:", req.file);
//     // console.log("body:", req.body);
//     if (!req.file) {
//       return res.status(400).json({ message: "No file Uploaded" });
//     }
//     // if (!req.file.mimetype !== "application/pdf") {
//     //   return res
//     //     .status(400)
//     //     .json({ message: "No file uploaded (expecting field name 'pdf')" });
//     // }
//     const buffer = req.file.buffer;
//     const arrayBuffer = buffer.buffer.slice(
//       buffer.byteOffset,
//       buffer.byteOffset + buffer.byteLength
//     );
//     const textData = await extractTextFromArrayBuffer(arrayBuffer);

//     if (!textData) {
//       console.log("error in textData");
//     }
//     const key = `pdfs/${Date.now()}--${req.file.originalname.replace(
//       /\s+/g,
//       "_"
//     )}`;
//     await s3.send(
//       new PutObjectAclCommand({
//         Bucket: env.aws?.bucketname,
//         Key: key,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//       })
//     );
//     const { jobDescription, userId } = req.body;
//     console.log(userId);
//     const newData = {
//       jobDescription,
//       pdfTextData: textData,
//       userId,
//       s3Key: key,
//     };
//     const updateNewData = await resumeData.findOneAndUpdate(
//       { userId },
//       { $set: newData },
//       { new: true, upsert: true, runValidators: true }
//     );
//     res.status(200).json({ message: `User jd and pdf data: ${updateNewData}` });
//   } catch (error) {
//     console.log("uploadSinglefile", error);
//     res
//       .status(500)
//       .json({ error: "something went wrong", details: error.message });
//   }
// };
export const uploadsingleFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file Uploaded" });
    }
  
    const buffer = req.file.buffer;
    const arrayBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
    const textData = await extractTextFromArrayBuffer(arrayBuffer);

    if (!textData) {
      console.log("error in textData");
    }
    const { jobDescription, userId } = req.body;
    console.log(userId);
    const newData = {
      jobDescription,
      pdfTextData: textData,
      userId,
    };
    const updateNewData = await resumeData.findOneAndUpdate(
      { userId },
      { $set: newData },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ message: `User jd and pdf data: ${updateNewData}` });
  } catch (error) {
    console.log("uploadSinglefile", error);
    res
      .status(500)
      .json({ error: "something went wrong", details: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await resumeData.findById(userId);
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadMultipleFile = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No file Uploaded" });
  }
  const filenames = req.files.map((file) => file.filename);
  res.send(`Files uploaded successfully: ${filenames.join(", ")}`);
};
