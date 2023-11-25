const { Transactions,Wallets } = require('../models');

const getTransactionsList=async(req,res)=>{
    try{
        const { walletId,page } = req.query;
        // const page = req.query.page || 1;
        
        //pagination
        
        const wallet = await Wallets.findByPk(walletId);
        const userName = wallet.name;

        if(!wallet){
            res.status(400).json({error:"Wallet not found"});
        }
        else{
            const limit = 2;
            const offset = (page - 1) * limit;
            const transactions = await Transactions.findAll({
                where: { wallet_id: walletId },
                offset: offset,
                limit: limit,
                order: [['created_at', 'DESC']],
            });
            const totalCount = await transactions.length;
            // console.log(totalCount);
            res.status(200).json({userName,totalCount,transactions:transactions});
        }       
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=getTransactionsList;