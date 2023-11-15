const {Wallets}=require('../models');
let id;

const createWallet=async(request,response)=>{
    try{
        const {name,balance}=request.body;
        
        const newWallet=await Wallets.create({
            name,balance,
        });
        console.log('New Wallet Created...');
        const responseData = {
            newWallet,
            id: newWallet.id,
            balance:newWallet.balance,
        };
        response.status(200).json(responseData);
        return responseData;
    }
    catch(error){
        console.log("Error creating wallet...",error);
        response.status(500).json({error:'Internal server Error'});
    }
};

module.exports={createWallet};