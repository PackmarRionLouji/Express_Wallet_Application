const sequelize=require('../sequelize/sequelize');
const wallet_route = require('./wallet_route');
const transaction_route = require('./transaction_route');

module.exports = {
  sequelize,
  wallet_route,
  transaction_route,
};
