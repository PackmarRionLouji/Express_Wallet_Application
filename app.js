const Sequelize=require('sequelize');
const express=require('express');
const {sequelize,Transactions,Wallets}=require('./models');
const app=express();
const PORT=3000;
const {wallet_route,transaction_route}=require('./route');

app.use(express.json());
app.use('/api/wallets',wallet_route);
// app.use('/',transaction_route);


sequelize.sync()
    .then(()=>{
        console.log("Database synced successfully....");
    })
    .catch((error)=>{
        console.log("Error creating database...",error);
    });

app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server is running on localhost:${PORT}`);
    }
    else{   
       console.log("Error starting the server...",error);
    }
})