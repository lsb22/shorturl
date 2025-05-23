import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import connectionString from "./connectionString.js";
import authRouter from "./routes/loginRoute.js";
import urlRouter from "./routes/urlRoute.js";
import homeRouter from "./routes/homeRoute.js";
import clicksRouter from "./routes/clicksRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// connecting to mongodb database
mongoose
  .connect(connectionString)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use("/", homeRouter);
app.use("/login", authRouter);
app.use("/url", urlRouter);
app.use("/click", clicksRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
