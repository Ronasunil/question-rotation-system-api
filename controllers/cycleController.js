const cron = require("node-cron");

const { AppError } = require("../utils/AppError");
const { CycleWorker } = require("../worker/CycleWorker");

const updateCycle = async (req, res) => {
  const { cycleId } = req.params;
  const { duration } = req.body;
  if (!duration) throw new AppError("Duration is not defined");

  //   data for updating cycle duration
  const data = {
    id: cycleId,
    updationObj: { duration },
  };

  const cycleWorker = await new CycleWorker().prepareQueueForUpdation(data);
  cycleWorker.updateCycle();

  res.status(200).json({ message: "cycle duration has been updated" });
};
// '
// "*/5 * * * * *" for testing purpose run on every 5 minute

// auto updating cycle count according to the cycle duration has met the date
cron.schedule("1 0 * * *", async () => {
  const today = Date.now();

  const cycleWorker = await new CycleWorker().prepareQueueForCronUpdation({
    today,
  });

  cycleWorker.cronUpdateCycle();
});

module.exports = { updateCycle };
