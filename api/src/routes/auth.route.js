import express from "express";
import { register, login, getAllUsers } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/",  getAllUsers);
export default router; 