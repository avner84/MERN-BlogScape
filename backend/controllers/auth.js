require('dotenv').config();

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        error.message = error.data.map(e => e.msg).join('. ');
        return next(error)
    }
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedPw,
            firstName,
            lastName
        });
        const result = await user.save();
        res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        error.message = error.data.map(e => e.msg).join('. ');
        return next(error)
    }
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            token: token,
            user: {
                id: loadedUser._id.toString(),
                email: loadedUser.email,
                firstName: loadedUser.firstName,
                lastName: loadedUser.lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editUser = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        // Combine error messages
        error.message = error.data.map(e => e.msg).join('. ');
        return next(error);
    }

    // Assume userID is obtained from the verified JWT token
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        // Check if the new email already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            const error = new Error('Email address already exists, please pick a different one.');
            error.statusCode = 422;
            return next(error);
        }

        // Update the fields received from the request
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        // Save the updated user to the database
        const result = await user.save();

        // Respond with success message and updated user data
        res.status(200).json({ message: 'User updated successfully.', user: result });
    } catch (error) {
        // Set a generic server error status code if none was set
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


exports.changePassword = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        error.message = error.data.map(e => e.msg).join('. ');
        return next(error)
    }

    console.log('Data received:', req.body);
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    let loadedUser;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        loadedUser = user;
        const isEqual = await bcrypt.compare(currentPassword, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }


        const hashedPw = await bcrypt.hash(newPassword, 12);

        user.password = hashedPw;
        // Save the updated user to the database
        const result = await user.save();


        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            token: token,
            user: {
                id: loadedUser._id.toString(),
                email: loadedUser.email,
                firstName: loadedUser.firstName,
                lastName: loadedUser.lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.deleteUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            const error = new Error('User could not be deleted.');
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({ message: 'User has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.edit2 = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        error.message = error.data.map(e => e.msg).join('. ');
        return next(error)
    }
    
    console.log('Data received:', req.body);
    const userId = req.userId;
    const { firstName, lastName, email, password } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

       
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
    
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        
        // Save the updated user to the database
        const result = await user.save();

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
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


//   exports.edit2 = async (req, res, next) => {
//     console.log(req.body); // ידפיס את גוף הבקשה לקונסול

//     // דמה של עיבוד הבקשה ושליחת תגובה
//     try {
//         // כאן יהיה העיבוד של הבקשה, למשל שמירה במסד נתונים או עדכון נתונים
//         // אם הכול הלך טוב, שלח תגובה חיובית
//         res.status(200).json({ message: 'User details updated successfully!' });
//     } catch (error) {
//         // אם התרחשה שגיאה, שלח תגובה עם השגיאה
//         console.error('There was an error!', error);
//         res.status(500).json({ message: 'Failed to update user details.' });
//     }
//   }
