import express from "express";
import body_parser from "express";
import cors from "cors";
import { createShortURL } from "./service/URLService.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(body_parser.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Running");
});
app.get("/api/shorten", (req, res) => {
  const { url, shortCode, expiry } = req.query;

  const result = createShortURL(url, shortCode, expiry);

  return res.status(200).json({
    ...result,
    success: true,
  });
});

app.get("api/:shortCode", (req, res) => {
  const { shortCode } = req.params;

  const record = findUrlByShortCode(shortCode);

  if (!record) {
    return res.status(404).send("Short URL not found");
  }

  record.click += 1;

  res.redirect(record.url);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
