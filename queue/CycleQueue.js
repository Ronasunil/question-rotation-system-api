const { Worker } = require("bullmq");
const { BaseQueue } = require("./BaseQueue");

class CycleQueue extends BaseQueue {
  constructor(name) {
    super(name);
  }

  async addToQueue(data) {
    await this.queue.add(this.queue.name, data, {
      attempts: 3,
      delay: 1000,
      priority: 1,
    });
  }

  processQueue(fn) {
    const worker = new Worker(this.queue.name, async (job) => fn(job), {
      connection: this.connectionOptions,
    });

    worker.on("completed", (job) => {
      console.log(`User worker job has completed ${job}`);
    });

    worker.on("failed", (job, err) => {
      console.error(
        `User worker Job has failed with error ${err} ${err.stack}`
      );
    });
  }
}
module.exports = { CycleQueue };
