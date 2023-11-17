const { Wallets } = require('../models');
const  createTransaction  = require('../lib/createTransaction');
const transferMoney=async(req,res)=>{
    const { fromAcc,toAcc,amount,description } = req.body;
    try{
        const sourceAcc = await Wallets.findByPk(fromAcc);
        const destAcc = await Wallets.findByPk(toAcc);

        if(!sourceAcc || !destAcc){
            if(!sourceAcc){
                return res.status(404).json({error:'Sender account details are not found.'});
            }
            else{
                return res.status(404).json({error:'Receiver account details are not found.'});
            }
        }

        else if(sourceAcc.balance<amount){
            return res.status(400).json({error:"Insuficient funds."});
        }
        else{
            const creditAmount=amount;
            const debitAmount=-amount;
            const debitResult=await createTransaction(fromAcc,debitAmount,description);
            const creditResult=await createTransaction(toAcc,creditAmount,description);
            if (creditResult.success) {
                res.status(200).json({ message: creditResult.message, transaction: creditResult.transaction });
            } else {
                res.status(400).json({ error: creditResult.error });
            }
            // return res.status(200).json({message:`Money transfer successful from ${sourceAcc.name} (${sourceAcc.wallet_id}) to ${destAcc.name} (${destAcc.wallet_id})`}); 
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Internal Server Error."});
    }
}
module.exports=transferMoney;