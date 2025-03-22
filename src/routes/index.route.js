import express from "express";
import authRoutes from "./auth.route.js";
import walletRoutes from "./wallet.route.js"; 
import { dashboard } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Register individual route modules
router.use("/auth", authRoutes);
router.use("/wallet", walletRoutes);
router.get("/dashboard",verifyToken, dashboard)


export default router;
