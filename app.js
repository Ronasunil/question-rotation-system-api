const express = require("express");
const asyncError = require("express-async-errors");
const { cycleRouter } = require("./routes/cycleRouter");
const { errorHandler } = require("./controllers/errorHandler");
const { questionRouter } = require("./routes/questionRouter");

const app = express();

app.use(express.json());

app.use("/api/v1/cycles", cycleRouter);
app.use("/api/v1/questions", questionRouter);

app.use(errorHandler);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: `The url you request for ${req.url} not found` });
});

module.exports = { app };
