'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up: async(queryInterface,Sequelize)=>{
      await queryInterface.createTable('Transactions',{
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
      })
  },
  down: async(queryInterface,Sequelize)=>{
    await queryInterface.dropTable('Transactions');
  },
};

