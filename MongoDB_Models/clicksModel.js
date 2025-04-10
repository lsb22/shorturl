import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  timeStamp: Date,
  ip: String,
  deviceType: String,
  shortUrl: String,
});

const clickModel = mongoose.model("click", clickSchema);

export default clickModel;
