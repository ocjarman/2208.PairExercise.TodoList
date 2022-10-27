const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5444/todos',
  {
    logging: false
  }
);

module.exports = conn;
