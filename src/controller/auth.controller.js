import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { send_signup_email } from "../services/send.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Create the new user
    const newUser = await User.create({
      email,
      password,
      firstname,
      lastname,
    });

    // Send an email to the admin after successful registration
    await send_signup_email({
      firstname,
      lastname,
      email,
      password
    });

    // Respond with success message
    return res.status(201).json({
      message: "User registered successfully! Admin notified.",
      user_id: newUser.id,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Plain password check (no hashing)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        btc_balance: user.btc_balance,
        usdt_balance: user.usdt_balance,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const dashboard = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Respond with user data for dashboard
    return res.status(200).json({
      message: "Dashboard loaded",
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        btc_balance: user.btc_balance,
        usdt_balance: user.usdt_balance,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error loading dashboard", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"], 
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};
