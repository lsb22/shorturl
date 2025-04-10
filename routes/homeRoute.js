import express from "express";
import urlModel from "../MongoDB_Models/urlModel.js";

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("Welcome to url shortner");
});

homeRouter.get("/:surl", async (req, res) => {
  const { surl } = req.params;
  try {
    const url = await urlModel.findOne({ shortUrl: surl });
    if (!url) {
      return res.status(404).json({ message: "Url doesn't exist" });
    }
    await urlModel.updateOne(
      {
        shortUrl: surl,
      },
      {
        $inc: {
          clicks: 1,
        },
      }
    );
    res.redirect(url.orgUrl);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default homeRouter;
