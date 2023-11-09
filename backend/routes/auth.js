const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');

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

router.post('/test-endpoint', (req, res) => {
    console.log('Data received:', req.body);
    res.status(200).json({ message: 'Data received successfully' });
});

router.patch('/change-password', isAuth,
    [
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
    ]
    , authController.changePassword);

router.delete('/delete-user', isAuth, authController.deleteUser)


router.patch(
    '/test-edit2',
    isAuth,
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
    ],
    authController.edit2
);





//   router.patch(
//     'edit-user',
//     isAuth,[
//         body('firstName')
//             .trim()
//             .not()
//             .isEmpty()
//             .withMessage('Please enter your first name.'),
//         body('lastName')
//             .trim()
//             .not()
//             .isEmpty()
//             .withMessage('Please enter your last name.'),
//             body('email')
//             .trim()
//             .isEmail()
//             .withMessage('Please enter a valid email address.')
//             .normalizeEmail()
//             .custom((value, { req }) => {
//                 return User.findOne({ email: value }).then(userDoc => {
//                     if (userDoc) {
//                         return Promise.reject('E-mail address already exists, please use a different one.');
//                     }
//                 });
//             }),        
//         body('password')
//             .trim()
//             .isLength({ min: 6 })
//             .withMessage('Password must be at least 6 characters long.') 
//     ],
//     authController.editUser
//   );


module.exports = router;
