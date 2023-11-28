const { createTransaction,createData }=require('../lib');
const { Validate } = require('../validators/validate');
const { Wallets } =require('../models');

const initializeTransaction=async(req,res)=>{
    try{
        const walletName=req.params.walletId;
        const wallet = await Wallets.findOne({
            where: {name: walletName}
        });
        const walletId = wallet.id;
        const { amount,description }=req.body;
        const data = await createData(walletId, amount, description);
        const validate =new Validate();
        const validate_Transaction = await validate.validateTransaction(walletId,amount,description);
        if(!validate_Transaction.error){
            if(Object.keys(data).length>2){
                const result=await createTransaction([data]);
                if(amount>=0){
                    return res.status(200).json({ message:`Transaction is completed Successfully. ${amount} credited into wallet ${walletName}.`,transaction:[result,walletName]});
                }else{
                    return res.status(200).json({ message:`Transaction is completed Successfully. ${-amount} debitted from wallet ${walletName}.`,transaction:[result,walletName]});
                }
                
            }else if(Object.keys(data).length===1){
                return res.status(400).json({error:data['error']});
            }
        }
        else{
            return res.status(400).json({error:`${validate_Transaction.error.message}`});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=initializeTransaction;