    const express=require('express');
    const router=express.Router();
    const walletController=require('../controller/walletController');
    const transactionController=require('../controller/transactionController');

    const createFields=async(request,response)=>{
        try{
            const walletResponse=await walletController.createWallet(request,response);
            
            const id=walletResponse.id;
            // console.log(id);
            const balance=walletResponse.balance;
            // console.log(balance);
            transactionController.createTransaction(request,response,id,balance);
        }
        catch(error){
            console.log("Error creating fields...",error);
            response.status(500).json({error:'Internal Server Error'});
        }
    }
    router.post('/',createFields);
    module.exports=router;