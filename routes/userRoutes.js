// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/users', (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

router.get('users/:id',(req, res) => {
    userModel.getUserById((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

module.exports = router;