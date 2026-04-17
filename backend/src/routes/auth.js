import exprees from "express"
import { getuserid, logout, signin, signup } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { userValidator } from "../validators/userValidator.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";

const router=exprees.Router();

router.post("/signup",validateBody(userValidator),signup);
router.post("/signin",signin);
router.get("/me",protectRoutes,getuserid);
router.post("/logout",logout);
export default router;