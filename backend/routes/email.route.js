import express from "express";
import {TestEmail} from '../controllers/email.controller.js'

const router = express.Router();

router.post("/email", TestEmail);

export default router;