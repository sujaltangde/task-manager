const { createToken } = require('../middlewares/auth');
const User = require('../models/userModel');

// User registration
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Manual validation checks
    if (!firstName) {
      return res.status(400).json({ success: false, message: 'First name is required' });
    }
    if (!lastName) {
      return res.status(400).json({ success: false, message: 'Last name is required' });
    }
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

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
      password,
    });

    const token = createToken(user._id, user.email);

    return res.status(201).json({
      success: true,
      message: 'Sign up successful!',
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

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Manual validation checks
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    // Check for user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = createToken(user._id, user.email);

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
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
    const password = Math.random().toString(36).slice(-8);

    if (!user) {
      user = await User.create({
        isGoogleAuth: true,
        email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        password,
      });
    }

    const token = createToken(user._id, user.email);

    return res.status(200).json({
      success: true,
      message: 'Login successfull!',
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
