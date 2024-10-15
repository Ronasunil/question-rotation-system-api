const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
  startDate: {
    type: Number,
    default: Date.now(),
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  duration: {
    type: Number,
    default: 7,
  },

  region: {
    type: String,
    default: "SG",
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  endDate: {
    type: Date,
    default: new Date(),
  },
});

// cycleSchema.pre("save", async function () {
//   this.endDate = new Date(
//     this.startDate.getTime() + this.duration * 1000 * 60 * 60 * 24
//   );
// });
const cycleModel = mongoose.model("Cycle", cycleSchema);

module.exports = { cycleModel };
