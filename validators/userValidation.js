const { body } = require('express-validator');

const userValidation = [
    body('name')
        .exists().withMessage('Name is required.')
        .isString().withMessage('Name must be a string.')
        .isLength({ min: 10 }).withMessage('Name must be at least 10 characters long.'),

    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address.'),
];

module.exports = userValidation;