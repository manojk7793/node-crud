const connection = require('../db');

const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    connection.query(query, callback);
};

const createUser = (name, email, callback) => {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(query, [name, email], callback);
  };

const getUserById = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], callback);
};

const updateUser = (id, name, email, callback) => {
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    connection.query(query, [name, email, id], callback);
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