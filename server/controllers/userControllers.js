const { createToken } = require('../middlewares/auth');
const User = require('../models/userModel');
const { body } = require('express-validator');

// Validation middleware for registration
exports.validateRegistration = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

// User registration
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password, // password will be hashed by mongoose pre-save middleware
    });

    const token = createToken(user._id, user.email);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    next(err); // Forward error to error handler
  }
};

// Validation middleware for login
exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createToken(user._id, user.email);

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully!',
      data: {
        id: user._id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    next(err); // Forward error to error handler
  }
};

// Firebase authentication
exports.firbaseAuth = async (req, res, next) => {
  try {
    const { email, name } = req.user;

    let user = await User.findOne({ email });
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    if (!user) {
      user = await User.create({
        isGoogleAuth: true,
        email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        password, // Password can be used for user authentication
      });
    }

    const token = createToken(user._id, user.email);

    return res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      token,
    });
  } catch (err) {
    return next(err); // Forward error to error handler
  }
};

// Auth verification
exports.verify = async (req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      isLogin: !!user, // true if user exists, false otherwise
    });
  } catch (err) {
    return next(err); // Forward error to error handler
  }
};
