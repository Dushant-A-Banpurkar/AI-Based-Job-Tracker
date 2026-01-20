import express from "express";
import {uploadsingleFile,uploadMultipleFile,getResumeById} from "../controllers/pdfEx.js"
import { uploadMemory } from "../middlewares/uploadMemory.js";

// import { upload } from "../controllers/pdfEx.js";
const router=express.Router();


// router.post('/upload-single',upload.single('pdf'),uploadsingleFile);
// router.post('/upload-multiple',upload.array('pdf',5),uploadMultipleFile);
// router.get('/resume-data/user/:userId',getResumeById);

router.post('/upload-single',uploadMemory.single("pdf"),uploadsingleFile);
router.post('/upload-multiple',uploadMultipleFile);
router.get('/resume-data/user/:userId',getResumeById);

export default router;