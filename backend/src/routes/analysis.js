import express from "express"
import { createAnalysis, fetchAnalysisHistory, getAnalysis } from "../controllers/analysis.js";
import { analysisRateLimiter } from "../middlewares/rateLimitter.js";

const router=express.Router();

router.post('/analyzing/:userId',analysisRateLimiter,createAnalysis);
router.get('/getanalysis/:id',getAnalysis);
router.post('/analysis-history',fetchAnalysisHistory)
export default router;