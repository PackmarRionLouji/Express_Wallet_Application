const Sequelize=require('sequelize');
const express=require('express');
const {sequelize,Transactions,Wallets}=require('./models');
const app=express();
const PORT=3000;
const { wallet_route,
        transaction_route,
        transactionList_route,
        transferMoney_route, 
        downloadFile_route,
        getWalletBalance_route,
        getTransaction_route,
        f_getWalletId_route, }=require('./route');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/wallet/setup',wallet_route);
app.use('/api/transact',transaction_route);
app.use('/api/getTransactionsList',transactionList_route);
app.use('/api/transferMoney',transferMoney_route);
app.use('/api/downloadFile',downloadFile_route);
app.use('/api/getWalletBalance',getWalletBalance_route);
app.use('/api/getTransaction',getTransaction_route);
app.use('/api/getWalletIds',f_getWalletId_route);

// sequelize.sync({ force: true }).then(() => {
//     console.log('Database synced successfully....');
// }).catch((err) => {
//     console.error('Error syncing database:', err);
// });

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server is running on localhost:${PORT}`);
    }
    else{   
       console.log("Error starting the server...",error);
    }
})