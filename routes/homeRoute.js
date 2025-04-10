import express from "express";

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("Welcome to url shortner");
});

export default homeRouter;
