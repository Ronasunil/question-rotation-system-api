const { AppError } = require("../utils/AppError");
const { BaseCache } = require("./BaseCache");

class UserCache extends BaseCache {
  constructor() {
    super();
  }

  async getUser(key) {
    const userJson = await this.client.get(`normalUser:${key}`);
    if (!userJson) throw new AppError(`Can't find user`, 403);

    const user = JSON.parse(userJson);

    return user;
  }

  async addUser(key, value) {
    const jsonValue = JSON.stringify(value);
    await this.client.set(`normalUser:${key}`, jsonValue);
  }
}

const userCache = new UserCache();

module.exports = { userCache };
