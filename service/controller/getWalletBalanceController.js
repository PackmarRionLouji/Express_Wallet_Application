const { Wallets } = require('../models');

const getWalletBalance=async(req,res)=>{
    const { walletId } = req.body;

    console.log(walletId);

    const Wallet = await Wallets.findOne({
        where: { name: walletId}
    });

    console.log(Wallet);
    const walletId1 = Wallet.id;

    try{
        if (!walletId1) {
            return res.status(400).json({ error: 'Wallet ID is required.' });
        }

        if(Wallet){
            const getBalance = Wallet.balance;
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
