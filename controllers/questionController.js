const { questionCache } = require("../cache/QuestionsCache");
const { userCache } = require("../cache/UserCache");
const { cycleModel } = require("../models/cycleModel");
const { questionsModel } = require("../models/questionModel");
const { userModel } = require("../models/userModel");
const { AppError } = require("../utils/AppError");

const getQuestion = async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw new AppError(`Can't find userId`, 403);

  // utlize aside pattern first cache then db
  const user =
    (await userCache.getUser(userId)) || (await userModel.findById(userId));
  if (!user) throw new AppError(`Can't find user`, 403);

  // cahce value
  const cachedQuestion = await questionCache.getQuestion(user.region);
  if (cachedQuestion) return res.status(200).json({ question: cachedQuestion });

  // if no value in cache  --EXECUTE--
  const cycle = await cycleModel.findById(user.cycleId);
  if (!cycle) throw new AppError(`Can't find cycle`, 403);

  const question = await questionsModel.findOne({ region: user.region });
  const currentQuestion = question.questions[cycle.count - 1];

  await questionCache.addQuestions(user.region, currentQuestion);

  res.status(200).json({ question: currentQuestion });
};

module.exports = { getQuestion };
