const { questionCache } = require("../cache/QuestionsCache");
const { cycleModel } = require("../models/cycleModel");
const { CycleQueue } = require("../queue/CycleQueue");

class CycleWorker {
  constructor() {
    this.cycleQueueForUpdation = new CycleQueue("cycleQueueUpdation");
    this.cycleQueueForCronUpdation = new CycleQueue("cycleCronupdation");
  }

  async prepareQueueForUpdation(data) {
    await this.cycleQueueForUpdation.addToQueue(data);
    return this;
  }

  async prepareQueueForCronUpdation(data) {
    await this.cycleQueueForCronUpdation.addToQueue(data);
    return this;
  }

  // This is for configuration of cycle update
  updateCycle() {
    this.cycleQueueForUpdation.processQueue(this.updateCycleFn);
  }

  async updateCycleFn(job) {
    const data = job.data;
    await cycleModel.findByIdAndUpdate(data.id, data.updatingObj);
  }

  // This is for automatic cycle updation using cron
  async cronUpdateCycleFn(job) {
    const { today } = job.data;

    const query = {
      $expr: {
        $gte: [
          today,
          { $add: ["$startDate", { $multiply: ["$duration", 86400000] }] },
        ],
      },
    };

    const cyclesToUpdate = await cycleModel.find(query);
    if (!cyclesToUpdate.length) return;

    const updatedResult = await cycleModel.updateMany(
      query,
      {
        $set: { startDate: new Date() },
        $inc: { count: 1 },
      },
      { new: true }
    );

    if (!updatedResult.modifiedCount) return;

    await Promise.all(
      cyclesToUpdate.map((cycle) => questionCache.removeRegions(cycle))
    );
  }

  cronUpdateCycle() {
    this.cycleQueueForCronUpdation.processQueue(this.cronUpdateCycleFn);
  }
}

module.exports = { CycleWorker };
