import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/admin/register", register);
router.post("/admin/login", login);

export default router;