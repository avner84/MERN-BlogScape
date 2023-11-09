const { body, validationResult } = require('express-validator');
const User = require('../models/user');


exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        error.message = error.data.map(e => e.msg).join('. ');
        return next(error);
    }
    next();
};



exports.signupValidations = [
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
];

exports.loginValidations = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
];

exports.changePasswordValidations = [
    body('currentPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    body('newPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    body('confirmNewPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Passwords do not match.');
            }
            return true;
        })
];



exports.editUserValidations = [
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
            return User.findById(req.userId).then(user => {
                if (user.email === value) {
                    // האימייל זהה לאימייל הנוכחי של המשתמש, לכן אין צורך לזרוק שגיאה.
                    return Promise.resolve();
                } else {
                    // בדוק אם האימייל כבר קיים במערכת
                    return User.findOne({ email: value }).then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('E-mail address already exists, please use a different one.');
                        }
                    });
                }
            });
        }),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
]