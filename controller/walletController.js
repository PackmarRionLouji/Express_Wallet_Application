const {Wallets}=require('../models');


const createWallet=async(request,response)=>{
    try{
        const {name,balance}=request.body;
        
        const newWallet=await Wallets.create({
            name,balance,
        });
        console.log('New Wallet Created...');
        response.status(200).json({newWallet});
    }
    catch(error){
        console.log("Error creating wallet...",error);
        response.status(500).json({error:'Internal server Error'});
    }
};

module.exports={createWallet};