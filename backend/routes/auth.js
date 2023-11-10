const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const validations = require('../middleware/validations')
const isAuth = require('../middleware/is-auth');


router.put(
    '/signup',
    validations.signupValidations,
    validations.handleValidationErrors,
    authController.signup
);

router.post(
    '/login',
    validations.loginValidations,
    validations.handleValidationErrors,
    authController.login
);

router.patch(
    '/change-password',
    isAuth,
    validations.changePasswordValidations,
    validations.handleValidationErrors,
    authController.changePassword
);

router.delete(
    '/delete-user',
    isAuth,
    authController.deleteUser
)

router.patch(
    '/edit-user',
    isAuth,
    validations.editUserValidations,
    validations.handleValidationErrors,
    authController.userEdit
);




module.exports = router;
