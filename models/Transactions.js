const { DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../sequelize/sequelize');

const Transactions = sequelize.define('Transactions', {
    transaction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue:Sequelize.UUIDV4
    },
    wallet_id: {
        type: DataTypes.INTEGER,
        unique: true,
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
}, {
    timestamps: false,
});

module.exports = Transactions;
