const { Queue } = require("bullmq");

class BaseQueue {
  constructor(name) {
    this.connectionOptions = {
      host: process.env.REDIS_RAW_HOST,
      port: process.env.REDIS_PORT,
    };
    this.queue = new Queue(name, {
      connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });
  }
}

module.exports = { BaseQueue };
