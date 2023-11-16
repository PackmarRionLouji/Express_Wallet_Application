'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up: async(queryInterface,Sequelize)=>{
      await queryInterface.createTable('Transactions',{
        
        transaction_id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue:Sequelize.UUIDV4
        },
      wallet_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
      },
      type: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
      },
      balance: {
          type: DataTypes.DOUBLE,
          allowNull: false,
      },
      created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
      },
      updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
      },
      description:{
        type:DataTypes.STRING,
        allowNull:false,
      }
  }, {
      timestamps: false,
  })  
  },
  down: async(queryInterface,Sequelize)=>{
    await queryInterface.dropTable('Transactions');
  },
};

