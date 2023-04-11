const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require('morgan')
const winston = require('winston');
const expressWinston = require('express-winston');
const httpLogger = require('./middleware/http-logger')

module.exports = function (app) {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/", "dist")));
    app.use(compression());
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors());
  app.use(helmet());
  app.use(httpLogger);
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));
};
