const express=require('express');
const router=express.Router();
const newWallet=require('../controller/walletController');
router.post('/',newWallet.createWallet);
module.exports=router;