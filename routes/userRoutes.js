// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const userValidation  = require('../validators/userValidation');
const multer = require('multer');
const fs = require('fs');

const User      = require('../models/User');
const Profile   = require('../models/Profile');
 
// Ensure the 'uploads' directory exists with 777 permissions
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { mode: 0o777 });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// List Users
router.get('/users', async(req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Profile,
                as: 'profile', // Use the alias if you have defined one in the model
                required: false // Change to true if you want to return only users with profiles
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Create a new User
router.post('/users', upload.single('image'), userValidation, async (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ validationErrors: errorMessages });
    }

    const userData = req.body;
    if (req.file) {
        userData.image = req.file.filename; // Add the uploaded file's name to userData
    }
    try {

        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// List One User Information
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update the user information
router.put('/users/:id', upload.single('image'), userValidation, async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ validationErrors: errorMessages });
    }

    try {
        const user = await User.findByPk(req.params.id);
        
        const userData = req.body;
        if (req.file) {
            userData.image = req.file.filename; // Add the uploaded file's name to userData
        }
        
        if (user) {
            const updatedUser = await user.update(userData);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete the User
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;