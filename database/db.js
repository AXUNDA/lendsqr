const knex = require('knex')({
      client: 'mysql2',
      connection: {
        host : 'containers-us-west-87.railway.app',
        port : 5635,
        user : 'root',
        password : 'E8EtqIJ3h9lwcnfpw26F',
        database : 'railway'
        
      }
    });

    module.exports = knex