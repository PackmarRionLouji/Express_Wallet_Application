const createTransaction=require('../lib/createTransaction');

const updateTransaction=async(req,res)=>{
    try{
        const walletId=req.params.walletId;
        const { amount,description }=req.body;
        console.log({walletId,amount,description});
        const result=await createTransaction(walletId,amount,description);
        if (result.success) {
            res.status(200).json({ message: result.message, transaction: result.transaction });
        } else {
            res.status(400).json({ error: result.error });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports=updateTransaction;