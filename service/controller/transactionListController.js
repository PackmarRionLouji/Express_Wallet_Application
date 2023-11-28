const { Transactions,Wallets } = require('../models');

const getTransactionsList=async(req,res)=>{
    try{
        const { walletId,page } = req.query;
        // const page = req.query.page || 1;
        
        //pagination
        
        const walletDetails = await Wallets.findOne({
            where: {name : walletId },
        });

        const wallet = walletDetails.dataValues;

        // console.log(wallet);
        const userName = wallet.name;
        // console.log(userName);

        if(!wallet){
            res.status(400).json({error:"Wallet not found"});
        }
        else{
            const limit = 10;
            const offset = (page - 1) * limit;
            const transactions = await Transactions.findAll({
                where: { wallet_id: wallet.id },
                offset: offset,
                limit: limit,
                order: [['created_at', 'DESC']],
            });
            const totalCount = await Transactions.count({
                where: {wallet_id:wallet.id},
            });
            const count = transactions.length;
            console.log(transactions);
            res.status(200).json({userName,totalCount,count,limit,transactions:transactions});
        }       
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=getTransactionsList;