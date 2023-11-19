const express=require('express');
const router=express.Router();
const getWalletBalance=require('../controller/getWalletBalanceController');

router.post('/',getWalletBalance);

module.exports=router;