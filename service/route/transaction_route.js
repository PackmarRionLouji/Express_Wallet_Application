const express=require('express');
const router= express.Router();
const updateTransaction =require('../controller/transactionController');

router.post('/:walletId',updateTransaction);
module.exports=router;