const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('learn_crud', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

const Profile = require('./Profile'); // Adjust the path if needed

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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false
});

User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile' });

sequelize.sync({ force: true }).then(() => {
    console.log('User Table Created');
}).catch((error) => {
    console.log('Unable to create User Table - '+error);
});

module.exports = User;
