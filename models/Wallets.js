// const {Sequelize,DataTypes}= require('sequelize');
// const sequelize = require('./sequelize');

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/sequelize');

const Wallets=sequelize.define('Wallets',{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    balance:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    updated_at:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
},{
    timestamps:false,
});

module.exports=Wallets;