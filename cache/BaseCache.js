const { Redis } = require("ioredis");

class BaseCache {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
  }
}

module.exports = { BaseCache };
