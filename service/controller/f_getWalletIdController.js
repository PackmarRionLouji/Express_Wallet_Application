const { Wallets } = require('../models');

const f_getWalletId=async(req,res)=>{
    const wallet = await Wallets.findAll();
    const walletId=[];
    for(let i=0;i<wallet.length;i++){
        walletId.push(wallet[i].dataValues.id);
    }
    // const walletId = Wallets
    res.status(200).json({walletId});

}

// f_getWalletId();
module.exports = f_getWalletId;