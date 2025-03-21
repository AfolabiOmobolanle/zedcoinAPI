import express from "express";
import authRoutes from "./auth.route.js";
import walletRoutes from "./wallet.route.js"; 

const router = express.Router();

// Register individual route modules
router.use("/auth", authRoutes);
router.use("/wallet", walletRoutes);

export default router;
