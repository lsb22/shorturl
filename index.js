import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectionString from "./connectionString.js";

const app = express();

app.use(cors());
app.use(express.json());

// connecting to mongodb database
mongoose
  .connect(connectionString)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

// creating user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("user", userSchema); // mongoose model
const secretKey = "SDEintern2025";

app.get("/", (req, res) => {
  res.send("Welcome to url shortner");
});

app.get("/login", async (req, res) => {
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

app.listen(3000, () => console.log("Server running on port 3000"));
