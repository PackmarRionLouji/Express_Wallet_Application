const Sequelize=require('sequelize');
const express=require('express');
const {sequelize,Transactions,Wallets}=require('./models');
const app=express();
const PORT=3000;
const {wallet_route,transaction_route}=require('./route');

app.use(express.json());
app.use('/api/wallet/setup',wallet_route);
app.use('/api/transact',transaction_route);


sequelize.sync({ force: true }).then(() => {
    console.log('Database synced successfully....');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server is running on localhost:${PORT}`);
    }
    else{   
       console.log("Error starting the server...",error);
    }
})