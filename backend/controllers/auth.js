require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


// Signup Function: Registers a new user with hashed password
exports.signup = async (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        // Hashing the password for security
        const hashedPw = await bcrypt.hash(password, 12);

        // Creating a new user instance
        const user = new User({
            email,
            password: hashedPw,
            firstName,
            lastName
        });

        // Saving the user to the database
        const result = await user.save();
        res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// Login Function: Authenticates a user and issues a JWT
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Checking if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        // Comparing the provided password with the stored hashed password
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        // Generating a JWT for the user
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Sending the response with token and user details
        res.status(200).json({
            token: token,
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


// Change Password Function: Allows a user to change their password
exports.changePassword = async (req, res, next) => {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    try {
        // Fetching the user from the database
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        // Verifying the current password
        const isEqual = await bcrypt.compare(currentPassword, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        // Hashing the new password and updating the user
        const hashedPw = await bcrypt.hash(newPassword, 12);
        user.password = hashedPw;
        const result = await user.save();

        // Generating a new JWT for the user
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Sending the response with the new token and user details
        res.status(200).json({
            token: token,
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


// Delete User Function: Deletes a user from the database
exports.deleteUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        // Checking if the user exists
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        // Deleting the user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            const error = new Error('User could not be deleted.');
            error.statusCode = 500;
            throw error;
        }

        // Sending a confirmation response
        res.status(200).json({ message: 'User has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


// Edit User Function: Allows a user to update their details
exports.userEdit = async (req, res, next) => {
    const userId = req.userId;
    const { firstName, lastName, email, password } = req.body;

    try {
        // Fetching the user from the database
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        // Verifying the password before updating details
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        // Updating the user details
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        const result = await user.save();

        // Generating a new JWT for the user
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Sending the response with the new token and updated user details
        res.status(200).json({
            token: token,
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

