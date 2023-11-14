'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up:async(queryInterface,Sequelize)=>{
    await queryInterface.createTable('Wallets',{
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
    })

  },

  down:async(queryInterface,Sequelize)=>{
      await queryInterface.dropTable('Wallet');
  },
};
