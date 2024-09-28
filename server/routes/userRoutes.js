const express = require('express');
const router = express.Router();
const {
    register,
    login,
    firbaseAuth,
    verify,
    validateRegistration,
    validateLogin
} = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/auth');

// User routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/auth/verify', isAuthenticated, verify);
router.post('/auth/firebase-auth', firbaseAuth);

module.exports = router;
