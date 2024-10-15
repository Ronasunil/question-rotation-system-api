const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const { cycleModel } = require("./models/cycleModel");
const { userModel } = require("./models/userModel");
const { questionsModel } = require("./models/questionModel");
const { userCache } = require("./cache/UserCache");

const regions = ["US", "SG", "UAE"];

const startDb = async function () {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/questions-rotation");
  } catch (err) {
    console.log(err);
  }
};

startDb();

async function seedUser(times) {
  for (let i = 0; i < times; i++) {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const cycle = await cycleModel.create({
      startDate: Date.now(),
      region: randomRegion,
    });

    const user = await userModel.create({
      cycleId: cycle.id,
      region: randomRegion,
      name: faker.internet.userName(),
    });

    await userCache.addUser(user._id, user);
  }
}

async function seedQuestions() {
  regions.forEach(async (region) => {
    await questionsModel.create({
      questions: [1, 2, 3, 4, 56, 7, 8, 9, 10],
      region,
    });
  });
}

seedUser(3);
seedQuestions();
