// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

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
router.post('/users', (req, res) => {
    const { name, email } = req.body;
    userModel.createUser(name, email, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({
            message: 'User Inserted Successfully!!!',
            data: {
                id: results.insertId,
                name: name,
                email: email,
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
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    userModel.updateUser(id, name, email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: 'User Updated Successfully!!!',
            data: {
                id: id, name: name, email: email
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