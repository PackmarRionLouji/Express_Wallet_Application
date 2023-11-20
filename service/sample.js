// const {Wallets, Transactions}=require('../service/models');
// const {v4:uuidv4}=require('uuid');
// const data=[{transaction_id:uuidv4(),wallet_id:18,type:1,amount:10000,balance:20000,description:"abcd"},
//       {transaction_id:uuidv4(),wallet_id:17,type:0,amount:5000,balance:15000,description:"dcba"}];

// async function insertData(data){
//     try {   
//         const db=await Transactions.bulkCreate(data);
//         console.log(db[0]);
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// const createData=insertData(data);
// console.log(createData);


// // console.log(db);