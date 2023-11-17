const express=require('express');
const router=express.Router();
const transferMoney=require('../controller/transferMoneyController');

router.post('/',transferMoney);
module.exports=router;