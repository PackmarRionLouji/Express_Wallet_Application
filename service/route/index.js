const sequelize=require('../sequelize/sequelize');
const wallet_route = require('./wallet_route');
const transaction_route = require('./transaction_route');
const transactionList_route=require('./transactionList_route');
const transferMoney_route=require('./transferMoney_route');
const downloadFile_route=require('./downloadFile_route');
const getWalletBalance_route=require('./getWalletBalance_route');

module.exports = {
  sequelize,
  wallet_route,
  transaction_route,
  transactionList_route,
  transferMoney_route,
  downloadFile_route,
  getWalletBalance_route,
};
