import express from "express";
import { register, login , logout,refresh} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import rateLimit from "express-rate-limit";
const router = express.Router();



const loginLimiter = rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:"Too many login attempts"
});




router.post("/admin/register", protect,
  isAdmin, register);
router.post("/admin/login", loginLimiter,login);
router.post("/admin/logout", logout);
router.post("/admin/refresh", refresh);

export default router;