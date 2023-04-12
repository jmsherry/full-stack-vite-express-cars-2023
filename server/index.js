require('dotenv').config()
const server = require('./server');

const {
  PORT=3333,
  LOCAL=true
} = process.env;

require('./process-handlers')(server);

const HOST = LOCAL === true ? '127.0.0.1' : '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

