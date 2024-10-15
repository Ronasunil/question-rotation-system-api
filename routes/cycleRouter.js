const { Router } = require("express");
const { updateCycle } = require("../controllers/cycleController");

const cycleRouter = Router();

cycleRouter.patch("/:cycleId", updateCycle);

module.exports = { cycleRouter };
