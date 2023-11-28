const { Wallets,Transactions } = require('../models');
const { v4:uuidv4 } = require('uuid');
const { Validate } = require('../validators/validate');
const { createData,createTransaction } =require('../lib');

const transferMoney=async(req,res)=>{
    const { fromAcc,toAcc,amount,description } = req.body;

    const sourceAcc = await Wallets.findOne({
        where: {name: fromAcc}
    });

    const destAcc = await Wallets.findOne({
        where: {name: toAcc}
    });

    const fromAcc1 = sourceAcc.id;
    const toAcc1 = destAcc.id;

    const validate =new Validate();
    const validate_Transaction1 = await validate.validateTransaction(fromAcc1,amount,description);

    if(!validate_Transaction1.error){
        const validate_Transaction2 = await validate.validateTransaction(toAcc1,amount,description);
        if(!validate_Transaction2.error){
        
            if(fromAcc1 === toAcc1 ){
                return res.status(400).json({error:'Sender account and Receiver account cannot be same.'});
            }
            else if( amount <0){
                return res.status(400).json({error:"Enter valid amount"});
            }
            try{
                if(!sourceAcc && !destAcc){
                    return res.status(404).json({error:'Sender and Receiver account details are not found.'});
                }
                else if(!sourceAcc || !destAcc){
                    if(!sourceAcc){
                        return res.status(404).json({error:'Sender account details are not found.'});
                    }
                    else{
                        return res.status(404).json({error:'Receiver account details are not found.'});
                    }
                }
                else{
                    const creditAmount=amount;
                    const debitAmount=-amount;
                    const validate =new Validate();
                    const validate_Transaction1 = await validate.validateTransaction(fromAcc1,debitAmount,description);
                    const validate_Transaction2 = await validate.validateTransaction(toAcc1,creditAmount,description);
                 
                    if(validate_Transaction1 && validate_Transaction2){
                        const sourceAcc_data = [await createData(fromAcc1,debitAmount,description)];
                        const destAcc_data = [await createData(toAcc1,creditAmount,description)];
        
                        // console.log(sourceAcc_data[0]);
                        if(Object.keys(sourceAcc_data[0]).length>2 && Object.keys(destAcc_data[0]).length>2){
                            const data = sourceAcc_data.concat(destAcc_data);
                            // console.log(data);
                            const result=await createTransaction(data);
                            return res.status(200).json({ message:`Money is transferred from ${fromAcc} to ${toAcc}. Transaction is completed Successfully`,Sender_Details:result[0],Receiver_Details:result[1]});
                            
                        }else if(Object.keys(sourceAcc_data[0]).length===1 && Object.keys(destAcc_data[0]).length===1){
                            // console.log("Endpoint");
                            return res.status(400).json({error:destAcc_data['message']});
                        }
                        else if(Object.keys(sourceAcc_data[0]).length===1){
                            return res.status(400).json({error:sourceAcc_data[0]['error']});   
                        }
                        else if(Object.keys(destAcc_data[0]).length===1){
                            return res.status(400).json({error:destAcc_data[0]['error']});   
                        }
                    }
                    else{
                        return res.status(400).json({error:"Enter Valid Details"});
                    }
                }
            }catch(error){
                console.log(error);
                return res.status(500).json({error:"Internal Server Error."});
            }
        }
        else{
            return res.status(400).json({error:`${validate_Transaction2.error.message}`});    
        }
    }
    else{
        return res.status(400).json({error:`${validate_Transaction1.error.message}`});
    }
}
module.exports=transferMoney;