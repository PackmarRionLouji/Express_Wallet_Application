const express=require('express');
const router=express.Router();
const transactionUpdateController=require('../transactionUpdateController');

const updateTransaction=async(req,res)=>{
    try{
        const transactionResponse=await transactionUpdateController.updateTransaction(req,res);
        res.status(200).json(transactionResponse);
    }
    catch(error){
        console.log("Error updating transaction...",error);
        res.status(500).json({error:'Internal Server Error...'});
    }
}

router.post('/:walletId',updateTransaction);

module.exports=transation_route;