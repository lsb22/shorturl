import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  orgUrl: String,
  shortUrl: String,
  clicks: Number,
  createdDate: Date,
  userId: String,
});

const urlModel = mongoose.model("shortUrl", urlSchema); // mongoose model

export default urlModel;
