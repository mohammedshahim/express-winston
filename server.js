const express = require("express");
const winston = require("winston");
require("dotenv").config();
const s3_upload = require("./s3_upload");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

logger.on("data", (chunk) => {
  s3_upload(JSON.stringify(chunk));
});

const app = express();
const port = process.env.PORT || 3000;

app.use(requestLogger);

app.get("/", (req, res) => {
  try {
    return res.status(200).json({
      message: "Hello World",
    });
  } catch (error) {
    logger.error(error.toString());
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Middleware to log incoming requests
function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}
