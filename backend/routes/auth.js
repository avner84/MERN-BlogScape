const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/user');

const { body } = require('express-validator');

router.put(
    '/signup',
    [
        body('firstName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Please enter your first name.'),
        body('lastName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Please enter your last name.'),
            body('email')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail()
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail address already exists, please use a different one.');
                    }
                });
            }),        
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long.'),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.');
                }
                return true;
            })
    ],
    authController.signup
);

router.post(
    '/login',
    [
      body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
      body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
    ],
    authController.login
  );

// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // כאן תבצע את האימות של המשתמש
//     if (email === 'jane.smith@example.com' && password === '123456') {
//         res.json({
//             email: "jane.smith@example.com",
//             firstName: "Jane",
//             lastName: "Smith",
//             id: 2
//         });
//     } else {
//         res.status(401).json({ message: 'Invalid email or password' });
//     }
// });

module.exports = router;
