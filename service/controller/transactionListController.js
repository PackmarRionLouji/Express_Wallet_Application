const { Transactions,Wallets } = require('../models');

const getTransactionsList=async(req,res)=>{
    try{
        const { walletId} = req.body;
        const limit = 25;
        const page = 1;
        const offset = (page - 1) * limit;

        const wallet = await Wallets.findByPk(walletId);
        const userName = wallet.name;

        if(!wallet){
            res.status(400).json({error:"Wallet not found"});
        }
        else{
            const transactions = await Transactions.findAll({
                where: { wallet_id: walletId },
                offset: offset,
                limit: limit,
                order: [['created_at', 'DESC']],
            });

            console.log(transactions);
            res.status(200).json({ userName, transactions: transactions.slice(offset,limit) });
        }       
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=getTransactionsList;