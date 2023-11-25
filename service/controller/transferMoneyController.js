const { Wallets,Transactions } = require('../models');
const { v4:uuidv4 } = require('uuid');
const { Validate } = require('../validators/validate');
const { createData,createTransaction } =require('../lib');

const transferMoney=async(req,res)=>{
    const { fromAcc,toAcc,amount,description } = req.body;
    if(fromAcc === toAcc ){
        res.status(400).json({error:'Sender account and Receiver account cannot be same.'});
    }
    else if( amount <0){
        res.status(400).json({error:"Enter valid amount"});
    }
    try{
        const sourceAcc = await Wallets.findByPk(fromAcc);
        const destAcc = await Wallets.findByPk(toAcc);
        if(!sourceAcc && !destAcc){
            res.status(404).json({error:'Sender and Receiver account details are not found.'});
        }
        else if(!sourceAcc || !destAcc){
            if(!sourceAcc){
                res.status(404).json({error:'Sender account details are not found.'});
            }
            else{
                res.status(404).json({error:'Receiver account details are not found.'});
            }
        }
        else{
            const creditAmount=amount;
            const debitAmount=-amount;
            const validate =new Validate();
            const validate_Transaction1 = await validate.validateTransaction(fromAcc,debitAmount,description);
            const validate_Transaction2 = await validate.validateTransaction(toAcc,creditAmount,description);
         
            if(validate_Transaction1 && validate_Transaction2){
                const sourceAcc_data = [await createData(fromAcc,debitAmount,description)];
                const destAcc_data = [await createData(toAcc,creditAmount,description)];

                // console.log(sourceAcc_data[0]);
                if(Object.keys(sourceAcc_data[0]).length>2 && Object.keys(destAcc_data[0]).length>2){
                    const data = sourceAcc_data.concat(destAcc_data);
                    // console.log(data);
                    const result=await createTransaction(data);
                    res.status(200).json({ message:`Money is transferred from ${fromAcc} to ${toAcc}. Transaction is completed Successfully`,Sender_Details:result[0],Receiver_Details:result[1]});
                    
                }else if(Object.keys(sourceAcc_data[0]).length===1 && Object.keys(destAcc_data[0]).length===1){
                    console.log("Endpoint");
                    res.status(400).json({message:destAcc_data['message']});
                }
                else if(Object.keys(sourceAcc_data[0]).length===1){
                    res.status(400).json({message:sourceAcc_data[0]['error']});   
                }
                else if(Object.keys(destAcc_data[0]).length===1){
                    res.status(400).json({message:destAcc_data[0]['error']});   
                }
            }
            else{
                res.status(400).json({error:"Enter Valid Details"});
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error."});
    }
}
module.exports=transferMoney;