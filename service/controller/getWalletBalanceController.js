const { Wallets } = require('../models');

const getWalletBalance=async(req,res)=>{
    const { walletId } = req.body;
    // console.log(walletId);
    console.log(walletId);
    try{
        if (!walletId) {
            return res.status(400).json({ error: 'Wallet ID is required.' });
        }
        const wallet= await Wallets.findByPk(walletId);

        // console.log(wallet);

        if(wallet){
            const getBalance = wallet.balance;
            return res.status(200).json({getBalance});
        }
        else{
            return res.status(400).json({error:'Wallet not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=getWalletBalance;
