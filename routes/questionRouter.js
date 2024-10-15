const { Router } = require("express");

const { getQuestion } = require("../controllers/questionController");

const questionRouter = Router();

questionRouter.get("/user/:userId", getQuestion);

module.exports = { questionRouter };
