require('dotenv').config()
const server = require('./server');
const logger = require("./middleware/logger");

const {
  PORT=3333,
  NODE_ENV='development',
  LOCAL=true
} = process.env;

const HOST = LOCAL ? '127.0.0.1' : '0.0.0.0';

server.listen(PORT, HOST, () => {
  logger.info(`Server listening on  http://${HOST}:${PORT}`);
});
