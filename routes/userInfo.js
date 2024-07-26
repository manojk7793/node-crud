// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userInfo = require('../models/userInfoModel');

// List Users
router.get('/usersInfo', (req, res) => {
    userInfo.getUsersInfo((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

module.exports = router;