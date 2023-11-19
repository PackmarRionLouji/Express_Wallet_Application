const express=require('express');
const router=express.Router();
const getTransactionsList=require('../controller/transactionListController');

router.get('/',getTransactionsList);

module.exports=router;