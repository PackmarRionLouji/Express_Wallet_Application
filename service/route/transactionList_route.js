const express=require('express');
const router=express.Router();
const getTransactionsList=require('../controller/transactionListController');

router.post('/',getTransactionsList);

module.exports=router;