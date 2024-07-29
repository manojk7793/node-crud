const connection = require('../db');

const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    connection.query(query, callback);
};

const createUser = (userData, callback) => {
    const query = 'INSERT INTO users (name, email, image) VALUES (?, ?, ?)';
    const values = [userData.name, userData.email, userData.image]; // Prepare the values
    connection.query(query, values, callback);
};

const getUserById = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], callback);
};

const updateUser = (id, userData, callback) => {
    const query = 'UPDATE users SET name = ?, email = ?, image = ? WHERE id = ?';
    const values = [userData.name, userData.email, userData.image, id]; // Prepare the values
    connection.query(query, values, callback);
};

const deleteUserById = (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], callback);
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUserById
};