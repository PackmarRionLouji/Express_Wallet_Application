const express = require('express');
const router = express.Router();
const f_getWalletId = require('../controller/f_getWalletIdController')

router.get('/',f_getWalletId);
module.exports = router;