require('dotenv').config()
const server = require('./server');
const logger = require("./middleware/logger");

const {
  PORT=3333,
  NODE_ENV='development'
} = process.env;

server.listen(PORT, () => {
  logger.info(`Server listening on  http://localhost:${PORT}`);
});
