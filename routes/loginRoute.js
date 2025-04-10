import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../MongoDB_Models/userModel.js";

const authRouter = express.Router();
const secretKey = "SDEintern2025"; // secret key for jwt

authRouter.post("/", async (req, res) => {
  // route for handling login request
  if (!req.body) {
    return res.status(400).json({ message: "Please enter the details" });
  }

  const { email, password } = req.body;
  try {
    const result = await userModel.find({ email: email });
    if (result.length === 0)
      return res
        .status(401)
        .json({ message: "User doesn't exist, please register" });
    if (result[0].password === password) {
      const token = await jwt.sign({ user: result[0]._id }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else res.status(403).json({ message: "Invalid password or email" });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default authRouter;
