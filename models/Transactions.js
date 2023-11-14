// const {Sequelize,DataType, DataTypes}=require('sequelize');
// const sequelize = require('./sequelize');

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/sequelize');

const Transactions=sequelize.define('Transactions',{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    transaction_id:{
        type:DataTypes.UUID,
        unique:true,
        // primaryKey:true,
        autoincrement:true,
        allowNull:false,
    },
    wallet_id:{
        type:DataTypes.UUID,
        unique:true,
        allowNull:false,
    },
    type:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    amount:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    balance:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
    updated_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
});

module.exports=Transactions;