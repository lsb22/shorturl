import express from "express";
import urlModel from "../MongoDB_Models/urlModel.js";

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("Welcome to url shortner");
});

// homeRouter.get("/:surl", async (req, res) => {
//   const { surl } = req.params;
//   try {
//     const url = await urlModel.find({ shortUrl: surl });
//     if (url.length == 0) {
//       return res.status(401).json({ message: "Url doesn't exist" });
//     }
//     urlModel
//       .updateOne(
//         {
//           shortUrl: surl,
//         },
//         {
//           $set: {
//             clicks: url[0].clicks + 1,
//           },
//         }
//       )
//       .then(() => console.log("clicks updated successfully"))
//       .catch((err) => console.log(err));
//     res.redirect(url[0].orgUrl);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

export default homeRouter;
