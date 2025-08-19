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
  return res.json(
    createShortURL(req.params.url, req.params.shortCode, req.params.expiry)
  );
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
