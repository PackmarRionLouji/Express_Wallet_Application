const express=require('express');
const router=express.Router();
const walletController=require('../controller/walletController');

router.post('/',walletController.createWallet);
module.exports=router;