const Joi = require('@hapi/joi');
const { Wallets } = require('../models');

const walletSchema = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z ]+$/).min(1).max(50).required(),
  balance: Joi.number().required(),
});

const transactionSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().min(1).max(50).trim().required(),
});

class Validate {
  validateWallet(name, balance) {
    return walletSchema.validate({ name, balance });
  }

  async validateTransaction(wallet_id, amount,description) {
    const wallet = await Wallets.findByPk(wallet_id);

    if (!wallet) {
      return false;
    } else {
      return transactionSchema.validate({ amount,description });
    }
  }
}

module.exports = {
  walletSchema,
  transactionSchema,
  Validate,
};
