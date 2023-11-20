const express=require('express');
const router=express.Router();
const getTransactionDetails=require('../controller/getTransactionDetailsController');

router.post('/',getTransactionDetails);
module.exports=router;