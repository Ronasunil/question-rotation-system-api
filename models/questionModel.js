const mongoose = require("mongoose");

const questions = new mongoose.Schema({
  region: {
    type: String,
    default: "SG",
    index: 1,
  },

  questions: {
    type: Array,
    default: Number,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const questionsModel = mongoose.model("Questions", questions);

module.exports = { questionsModel };
