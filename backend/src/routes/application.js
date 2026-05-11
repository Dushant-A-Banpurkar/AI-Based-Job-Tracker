
import express from "express"
import { addApplication, getJobApplication } from "../controllers/application.js";



const router=express.Router();
router.post("/add",addApplication);
router.post("/get",getJobApplication)

export default router;