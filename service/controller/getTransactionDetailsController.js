const { Transactions,Wallets }=require('../models');

const getTransactionDetails=async(req,res)=>{
    try{
        const transactionId=req.body;
        console.log(transactionId);
        const transaction=await Transactions.findByPk(transactionId.transactionId);
        if(transaction){
            const transactionDetails={
                transaction,
            };
            return res.status(200).json({transaction: transactionDetails.transaction});
        }
        else{
            return res.status(400).json({error:'Transaction not found'});
        }
        
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Internal Server Error.'});
    } 
}

module.exports=getTransactionDetails;