const { Wallets,Transactions } = require('../models');


const createTransaction= async(data)=>{
    try{
        const createTransaction = await Transactions.bulkCreate(data);
        // console.log("Created");
        return createTransaction;
    }catch(error){
        // console.log("Error creating transaction",error);
        throw error;
    }
};

module.exports=createTransaction;