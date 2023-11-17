const { Wallets,Transactions } = require('../models');
const { v4:uuidv4 } = require('uuid');
const { Validate } = require('../validators/validate');

const createTransaction= async(walletId,amount,description)=>{
    const validate = new Validate();
    const validate_Transaction = await validate.validateTransaction(walletId,amount,description);
    console.log(validate_Transaction);
        if(validate_Transaction){
            const transaction_id=uuidv4();
            const getWallet = await Wallets.findByPk(walletId);
                    // let createTransaction;
            const dummyValue=getWallet.balance+amount;
            if(dummyValue>=0){
                console.log(getWallet.balance);
                const newBalance=getWallet.balance+amount;
                const createTransaction = await Transactions.create({
                    transaction_id:transaction_id,
                    wallet_id:getWallet.id,
                    type:amount>=0? 1:0,
                    amount,
                    balance:newBalance,
                    description:description,
            });
            getWallet.update({balance:newBalance});
            console.log(getWallet.balance);
            if (amount >= 0) {
                return { success: true, message: "Money Credited. Transaction is completed successfully...", transaction: createTransaction };
            } else {
                return { success: true, message: "Money Debited. Transaction is completed successfully.", transaction: createTransaction };
            }
        }
        else{
            return {success:false,message:"Insufficient funds."};
        }                
    }
    else{
        return {success:false,message:"Wallet not found."};
    }
};

module.exports=createTransaction;