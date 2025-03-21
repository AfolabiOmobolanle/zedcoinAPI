import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/index.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Zedcoin API!" });
});

// Export the Express app for Vercel serverless function
export default app;
