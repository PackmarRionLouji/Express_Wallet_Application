const { v4: uuidv4 } = require('uuid');
const { Wallets, Transactions } = require('../models');
const { Validate } = require('../validators/validate'); 

const createWallet = async (request, response) => {
  try {
    const { name, balance } = request.body;
    if(balance<0){
      return response.status(400).json({error:"Initial Amount cannot be negative"});
    }
    else{
      const validator = new Validate();
      if(typeof balance==='number'){
      const { error: validationError } = validator.validateWallet(name, balance);
        if (validationError) {
          return response.status(400).json({
            error: `Validation Error. ${validationError.details[0].message}`,
          });
        }
        const checkExistingWallet=await Wallets.findOne({
            where:{name},
        });
        if(checkExistingWallet){
            return response.status(400).json({error:`Error creating wallet. ${name} already exixts.`,success:false});
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
          return response.status(200).json({wallet: [newWallet], id: newWallet.id,success:true});
        }
      }else{
        return response.status(400).json({error:"Balance must be a numeric value.",success:false});
      } 
    }
  }
  catch (error) {
        console.error("Error creating Wallet...", error);
        return response.status(500).json({ error: "Internal Server Error",success:false});
  }  
};

module.exports = { createWallet };
