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
        
        const validate =new Validate();
        const validate_Transaction = await validate.validateTransaction(walletId,amount,description); 
        if(validate_Transaction){
            const data = await createData(walletId, amount, description);
            if(Object.keys(data).length>2){
                const result=await createTransaction([data]);
                if(amount>=0){
                    return res.status(200).json({ message:`Money credited into wallet ${walletName}. Transaction is completed Successfully`,transaction:result});
                }else{
                    return res.status(200).json({ message:`Money debitted from wallet ${walletName}. Transaction is completed Successfully`,transaction:result});
                }
                
            }else if(Object.keys(data).length===1){
                res.status(400).json({message:data['error']});
            }
        }
        else{
            res.status(400).json({error:"Enter valid Details"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=initializeTransaction;