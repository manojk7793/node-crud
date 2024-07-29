const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('learn_crud', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false
});

module.exports = User;
