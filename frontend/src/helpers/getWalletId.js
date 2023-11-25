const { Wallets } = require('../../../service/models');

const getWalletId = async () => {
    const walletData = await Wallets.findAll();
    // console.log(walletData[0]);
    // console.log("Hello");
    const walletIds=[];
    for(let i=0;i<walletData.length;i++){
        walletIds.push(await walletData[i].dataValues.id);
    }
    return walletIds;
};

module.exports=getWalletId;