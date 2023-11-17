const Joi = require('@hapi/joi');
const { Wallets } = require('../models');

const walletSchema = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z ]+$/).min(1).max(50).required().trim().messages({
    'string.pattern.base':'Names can only contain letters and spaces',
    'string.empty':'Name is required',
    'any.required':'Name is required',
    'string.min':'Name must be atlest 1 character long',
    'string.max':'Name cannot be longer than 50 characters',
  }),
  balance: Joi.number().required().messages({
    'number.base':'Balance must be a number',
    'any.required':'Balance is required',
  }),
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
