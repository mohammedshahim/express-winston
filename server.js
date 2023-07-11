const express = require("express");
const winston = require("winston");
require("dotenv").config();
const s3_upload = require("./s3_upload");
const post = require("./routes/post");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

logger.on("data", (chunk) => {
  s3_upload(JSON.stringify(chunk));
});

// Middleware to log incoming requests
function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(requestLogger);

app.use("/api", post);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
