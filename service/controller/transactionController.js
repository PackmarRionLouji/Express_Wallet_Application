const { Wallets,Transactions } = require('../models');
const { v4:uuidv4 } = require('uuid');
const { Validate } = require('../validators/validate');

const updateTransaction=async(req,res)=>{
    try{
        const walletId=req.params.walletId;
        const { amount,description }=req.body;
        console.log({walletId,amount,description});
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
                    if(amount>=0){
                        res.status(200).json({message:"Money Credited. Transaction is completed successfully...",createTransaction});
                    }else{
                        res.status(200).json({message:"Money debitted. Transaction is completed successfully.",createTransaction});
                    }
                }
                else{
                    res.status(400).json({message:"Insufficient funds."});
                }
                
            }
            else{
                res.status(400).json({message:"Wallet not found."});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({error:'Internal Server Error'});
        }
}

module.exports=updateTransaction;