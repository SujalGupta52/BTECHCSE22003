import express from "express";
import body_parser from "express";
import cors from "cors";
import Log from "../../Logging Middleware/Logger.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(body_parser.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Running");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
