const { v4: uuidv4 } = require('uuid');
const { Wallets, Transactions } = require('../models');
const { Validate } = require('../validators/validate'); 

const createWallet = async (request, response) => {
  try {
    const { name, balance } = request.body;

    if(balance<0){
      response.status(400).json({error:"Initial Amount cannot be negative"});
    }
    else{
      const validator = new Validate();
      const { error: validationError } = validator.validateWallet(name, balance);
      if(typeof balance==='number'){
        if (validationError) {
          return response.status(400).json({
            error: 'Validation Error',
            message:validationError.details[0].message,
          });
        }
        const checkExistingWallet=await Wallets.findOne({
            where:{name},
        });
        if(checkExistingWallet){
            return response.status(400).json({error:`Error creating wallet. ${name} already exixts.`});
        }
        else{
          const newWallet = await Wallets.create({
              name, balance,
          });
          const transactionId=uuidv4();
            // console.log(transactionId);
          const newTransaction = await Transactions.create({
              transaction_id:transactionId,
              wallet_id: newWallet.id,
              type: 1,
              amount: balance,
              balance,
              description:"Initial Creation",
          });
          console.log("Wallet created Successfully...");
          response.status(200).json(newWallet);
        }
      }else{
        response.status(400).json({error:"Number must be a numeric value."});
      } 
    }
  }
  catch (error) {
        console.error("Error creating Wallet...", error);
        response.status(500).json({ error: "Internal Server Error" });
  }  
};

module.exports = { createWallet };
