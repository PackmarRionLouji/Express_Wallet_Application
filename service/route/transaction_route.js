const express=require('express');
const router= express.Router();
const initializeTransaction =require('../controller/transactionController');

router.post('/:walletId',initializeTransaction);
module.exports=router;