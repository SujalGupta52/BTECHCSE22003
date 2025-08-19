import Log from "../../../Logging Middleware/Logger.js";
import db from "../db/db.js";
import ShortUrl from "../model/ShortUrl.js";

function createShortURL(url, shortCode, expiry) {
  const shortCodeExists = db.find((item) => item.shortCode == shortCode);
  const shortURL = new ShortUrl(url, null, expiry);
  if (!shortCodeExists) shortURL.shortCode = shortCode;
  db.push(shortURL);
  Log("backend", "info", "service", "Added ShortUrl to databse");
  return {
    url: shortURL.url,
    shortCode: shortURL.shortCode,
    expiry: shortURL.expiry,
  };
}

function getClickCount(shortCode) {
  const shortUrl = db.find((item) => item.shortCode == shortCode);

  if (!shortUrl) {
    Log(
      "backend",
      "warn",
      "service",
      `ShortUrl with code ${shortCode} not found`
    );
    return null;
  }

  Log(
    "backend",
    "info",
    "service",
    `Click count for shortCode ${shortCode} retrieved`
  );

  return shortUrl.click;
}

function findByShortCode(shortCode) {
  const shortURL = db.find((entry) => entry.shortCode === shortCode) || null;
  Log(
    "backend",
    "info",
    "service",
    `Finding shortURL from shortCode: ${shortCode}`
  );
}

export { createShortURL, getClickCount, findByShortCode };
