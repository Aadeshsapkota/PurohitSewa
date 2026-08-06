import express from "express";
import { register, login , logout,refresh} from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/admin/register", register);
router.post("/admin/login", login);
router.post("/admin/logout", logout);
router.post("/admin/refresh", refresh);

export default router;