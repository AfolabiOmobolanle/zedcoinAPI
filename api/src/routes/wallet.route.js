import express from "express";
import { createWallet, withdrawAmount } from "../controller/address.controller.js";

const router = express.Router();


router.post("/withdraw", withdrawAmount);
router.get("/generate-wallet", createWallet);

export default router;
