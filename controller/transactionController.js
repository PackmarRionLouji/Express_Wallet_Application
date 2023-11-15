const {Transactions}=require('../models');
const createTransaction=async(request,response,id,balance)=>{
    try{
        const newTransaction=await Transactions.create({
            wallet_id:id,
            amount:balance,
            type:balance>=0?1:0,
            balance:balance,
        },{
                timestamps:false,
        });
        console.log('New Transaction Created...');
        response.status(200).json({newTransaction});
    }
    catch(error){
        // console.log("Transaction not created..",error);
    }
};

module.exports={createTransaction};