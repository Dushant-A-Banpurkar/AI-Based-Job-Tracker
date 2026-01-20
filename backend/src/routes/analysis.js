import express from "express"
import { createAnalysis, getAnalysis } from "../controllers/analysis.js";

const router=express.Router();

router.post('/analyzing/:userId',createAnalysis);
router.get('/getanalysis/:userId',getAnalysis);
export default router;