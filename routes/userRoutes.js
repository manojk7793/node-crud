// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const userValidation  = require('../validators/userValidation');

// List Users
router.get('/users', (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'Users not found' });
        res.status(200).send({
            message: 'Users Fetched Successfully!!!',
            data: results
        });
    });
});

// Create a new User
router.post('/users', userValidation, (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ validationErrors: errorMessages });
    }

    const userData = req.body;
    userModel.createUser(userData, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({
            message: 'User Inserted Successfully!!!',
            data: {
                id: results.insertId,
                ...results
            }
        });
    });
});

// List One User Information
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userModel.getUserById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({
            message: 'User Fetched Successfully!!!',
            data: results[0]
        });
    });
});

// Update the user information
router.put('/users/:id', userValidation, (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ validationErrors: errorMessages });
    }

    const { id } = req.params;
    const userData = req.body;
    userModel.updateUser(id, userData, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: 'User Updated Successfully!!!',
            data: {
                id: id, ...results
            }
        });
    });
});

// Delete the User
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userModel.deleteUserById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: 'User Deleted Successfully!!!',
        });
    });
});

module.exports = router;