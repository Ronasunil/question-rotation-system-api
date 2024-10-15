const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cycleId: {
    type: mongoose.Types.ObjectId,
    ref: "Cycle",
  },

  name: {
    type: String,
    required: true,
  },

  region: {
    type: String,
    default: "SG",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
