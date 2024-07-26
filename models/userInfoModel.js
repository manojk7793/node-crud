const connection = require('../db');

const getUsersInfo = (callback) => {
    const query = 'SELECT * FROM user_details';
    connection.query(query, callback);
};

module.exports = {
    getUsersInfo
}