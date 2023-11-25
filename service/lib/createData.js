const { Wallets } =require('../models'); 
const { v4:uuidv4 } = require('uuid');

const createData = async(walletId1,amount1,description)=>{
    const walletId = Number(walletId1);
    const amount = Number(amount1);
    const wallet = await Wallets.findByPk(walletId);
    if(!wallet){
        const message = [{error:"Wallet Not found"}]; 
        return message[0];
    }
    const dummyBalance = wallet.balance+amount;
    if(dummyBalance>=0){
        const newBalance=wallet.balance+amount;
        const data=[{transaction_id:uuidv4(),
                     wallet_id:walletId,
                     type:amount>=0? 1:0,
                     amount:amount>=0? amount:-amount,
                     balance:newBalance,
                     description:description,}];
        await wallet.update({balance:newBalance});
            // console.log(data[0]);
        return data[0];
    }else{
        const message= [{error: "Insufficient funds"}];
            // console.log(Object.keys(message).length);
        return message[0];

    }
};

module.exports=createData;