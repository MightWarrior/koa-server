const { Client } = require('pg'); // https://node-postgres.com/

module.exports = {
  getConnection: async () => {
    const client = new Client({
      user: 'max',
      password: '',
      database: 'ideas',
      port: 5432,
      host: 'localhost'
    });

    await client.connect();
    return client;
  }
};
