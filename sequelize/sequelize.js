const { Sequelize } = require('sequelize');

// Connection parameters
const sequelize = new Sequelize('Wallet_Application', 'postgres', 'admin',{
  host:'localhost',
  dialect:'postgres',
});

module.exports=sequelize;

