import express from "express";
import jwt from "jsonwebtoken";
import ShortUniqueId from "short-unique-id";
import urlModel from "../MongoDB_Models/urlModel.js";

const urlRouter = express.Router();
const uid = new ShortUniqueId({ length: 6 }); // for generating unique id's
const secretKey = "SDEintern2025"; // secret key for jwt

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) res.status(403).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

urlRouter.post("/:userId", verifyToken, async (req, res) => {
  // route for shortening url
  if (!req.body)
    return res.status(400).json({ message: "Please enter the url" });
  const { userId } = req.params;
  const { url } = req.body;
  const shortenedUrl = "https://shorturl-xi-beige.vercel.app/" + uid.rnd();

  const shortUrl = new urlModel({
    orgUrl: url,
    clicks: 0,
    createdDate: new Date(),
    shortUrl: shortenedUrl,
    userId,
  });

  try {
    const newUrl = await shortUrl.save();
    res.status(200).json({ url, newUrl });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

urlRouter.get("/:userId", verifyToken, async (req, res) => {
  // route to get urls of a specific user
  const { userId } = req.params;
  try {
    const urls = await urlModel.find({ userId: userId });
    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default urlRouter;
