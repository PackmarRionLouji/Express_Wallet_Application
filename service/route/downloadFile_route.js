const express=require('express');
const router=express.Router();
const downloadFile=require('../controller/downloadFileController');

router.post('/',downloadFile);

module.exports=router;