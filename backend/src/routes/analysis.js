import express from "express"
import { createAnalysis, fetchAnalysisHistory, getAnalysis } from "../controllers/analysis.js";

const router=express.Router();

router.post('/analyzing/:userId',createAnalysis);
router.get('/getanalysis/:id',getAnalysis);
router.post('/analysis-history',fetchAnalysisHistory)
export default router;