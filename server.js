const mongoose = require("mongoose");

const { app } = require("./app");

require("dotenv").config({ path: "./config.env" });

const startDb = async function () {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/questions-rotation");
  } catch (err) {
    console.log(err);
  }
};

startDb();

app.listen(3000, () => {
  console.log("server started");
});
