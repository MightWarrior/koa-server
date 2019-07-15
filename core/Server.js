const http = require('http');
const config = require('../config');

class Server {
  constructor(app) {
    this.app = app;
    this.server = http.Server(app.callback());

    app.context.server = this;
  }

  async start(port) {
    return this.server.listen(port);
  }
}

module.exports = Server;
