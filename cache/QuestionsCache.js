const { AppError } = require("../utils/AppError");
const { BaseCache } = require("./BaseCache");

class QuestionsCache extends BaseCache {
  constructor() {
    super();
  }

  async getQuestion(key) {
    const resultJson = await this.client.get(`questionRegions:${key}`);
    if (!resultJson) return;

    const result = JSON.parse(resultJson);
    return result;
  }

  async addQuestions(key, value) {
    const jsonValue = JSON.stringify(value);
    await this.client.set(`questionRegions:${key}`, jsonValue);
  }

  async removeRegions(key) {
    const result = await this.client.del(`questionRegions:${key}`);
    if (!result) return;
  }
}

const questionCache = new QuestionsCache();

module.exports = { questionCache };
