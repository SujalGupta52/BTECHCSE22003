import Log from "../../../Logging Middleware/Logger.js";

function generateUniqueCode() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}
export default class ShortUrl {
  constructor(url, shortCode, expiry, click) {
    this.url = url;
    if (!shortCode) {
      this.shortCode = shortCode;
    } else this.shortCode = generateUniqueCode();
    if (!expiry) {
      this.expiry = expiry;
    } else this.expiry = new Date(now.getTime() + 30 * 60 * 1000);
    this.click = 0;
    Log("backend", "info", "db", "New ShortUrl object created successfully");
  }
}
