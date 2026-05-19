
import express from "express"
import { addApplication, getJobApplication,getJobApplicationById, updateJobApplication} from "../controllers/application.js";
import { update } from "../controllers/auth.js";



const router=express.Router();
router.post("/add",addApplication);
router.post("/get",getJobApplication)
router.get('/id/:id',getJobApplicationById)
router.put('/update/:id',updateJobApplication)

export default router;