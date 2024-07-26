const connection = require('../db');

const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    connection.query(query, callback);
};

const getUserById = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], callback);
};

module.exports = {
    getAllUsers,
    getUserById
};