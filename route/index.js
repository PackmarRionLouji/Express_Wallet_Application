const sequelize=require('../sequelize/sequelize');
const transaction_route = require('./transaction_route');
const wallet_route = require('./wallet_route');

module.exports = {
  sequelize,
  wallet_route,
  transaction_route,
};
