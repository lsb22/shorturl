import express from "express";
import jwt from "jsonwebtoken";
import clickModel from "../MongoDB_Models/clicksModel.js";

const clicksRouter = express.Router();
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

clicksRouter.post("/shrturl", verifyToken, async (req, res) => {
  const { shortUrl } = req.body;
  try {
    const result = await clickModel.aggregate([
      { $match: { shortUrl: shortUrl } },
      {
        $project: {
          month: { $month: "$timeStamp" },
          year: { $year: "$timeStamp" },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          clickCount: { $sum: 1 },
        },
      },

      {
        $project: {
          _id: 0,
          date: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $toString: {
                  $cond: [
                    { $lt: ["$_id.month", 10] },
                    { $concat: ["0", { $toString: "$_id.month" }] },
                    { $toString: "$_id.month" },
                  ],
                },
              },
            ],
          },
          clicks: "$clickCount",
        },
      },
      { $sort: { date: 1 } },
    ]);
    res.status(200).json({ urls: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default clicksRouter;
