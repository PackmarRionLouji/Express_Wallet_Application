const { Transactions,Wallets } = require('../models');
const  exceljs  = require('exceljs');
const  pdfkit  = require('pdfkit');
const fs = require('fs');

const createFile=async(req,res)=>{
        try{
                const { walletId,format } = req.body;
                // walletId,format,wallet,userName
                const wallet = await Wallets.findByPk(walletId);
                const userName = wallet.name;
                const workbook=new exceljs.Workbook();
                const transactions=await Transactions.findAll({
                        where: {wallet_id:walletId},
                });

                if (!wallet) {
                        res.status(400).json({error:"Wallet not found"}); 
                }

                const worksheet=workbook.addWorksheet('Transactions');
                worksheet.addRow({'User Name ':userName});
                worksheet.addRow({'Wallet ID':walletId});
                worksheet.addRow();
                worksheet.addRow();

                worksheet.columns=[
                        {header:'User Name',key:'userName',width:20},
                        {header:'Wallet ID',key:'walletId',width:8},
                        {header:'Transation ID',key:'transaction_id',width:40},
                        {header:'Type',key:'type',width:5},
                        {header:'Amount',key:'amount',width:20},
                        {header:'Balance',key:'balance',width:20},
                        {header:'Description',key:'description',width:25},
                        {header:'Created At',key:'created_at',width:15},
                        {header:'Updated At',key:'updated_at',width:15},
                ];
                

                for(let i=0;i<transactions.length;i++){
                        const transaction=transactions[i];
                        worksheet.addRow({
                                userName:userName,
                                walletId:walletId,
                                transaction_id:transaction.transaction_id,
                                type: transaction.type,
                                amount: transaction.amount,
                                balance:transaction.balance,
                                description: transaction.description,
                                created_at:transaction.created_at,
                                updated_at:transaction.updated_at,    
                        });
                }
                let excelBuffer;
                // fs.writeFileSync('transactions.xlsx',excelBuffer);



                if(format==='excel'){
                        excelBuffer=await workbook.xlsx.writeBuffer();
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        res.setHeader('Content-Disposition', 'attachment; filename=transactions.xlsx');
                        res.status(200).send(excelBuffer);
                        
                }
                // else if(format ==='pdf'){
                        
                // }
                else{
                        res.status(400).json({error:"Invalid format specified"});
                }
        }catch(error){
                console.log("Error creating file",error);
                res.status(500).json({error:"Internal Server Error"});
        }
};

module.exports=createFile;