const path = require("path");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const favicon = require("serve-favicon");
require("dotenv").config();

const booksRouter = require("./routers/books.router")

const MONGODB_URI = process.env.NODE_ENV ? 'mongodb://localhost:27017' : process.env.MONGODB_URI;

const app = express();
app.use(cors());

(async function () {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected!");
  } catch (e) {
    console.log(`MongoDB connection error ${e}`);
  }
})();

app.disable("x-powered-by");
app.use(cors());
app.use(
  morgan("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);
app.use(morgan("dev"));

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(express.json());

app.use("/api/v1/books", booksRouter);

app.all("*", (req, res, next) => {
  const error = new Error("No route found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    success: false,
    data: error.message,
    status,
  });
});

app.listen(8080, () => console.log(`listening on 8080`));
