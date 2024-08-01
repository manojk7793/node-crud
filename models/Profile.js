const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('learn_crud', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

const User = require('./User'); // Adjust the path if needed

const Profile = sequelize.define('profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false
});

sequelize.sync().then(() => {
    console.log('Profile Table Created');
}).catch((error) => {
    console.log('Unable to create Profile Table - '+error);
});

module.exports = Profile;