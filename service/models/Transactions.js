const { DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../sequelize/sequelize');

const Transactions = sequelize.define('Transactions', {
    transaction_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:Sequelize.UUIDV4,
    },
    wallet_id: {
        type: DataTypes.INTEGER,
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
});

module.exports = Transactions;
