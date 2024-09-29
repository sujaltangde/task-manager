const express = require('express');
const router = express.Router();
const {
    register,
    login,
    firbaseAuth,
    verify,
    getUser
} = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/auth');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');

// User routes
router.get('/', isAuthenticated, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/auth/verify', isAuthenticated, verify);
router.post('/auth/firebase-auth', verifyFirebaseToken, firbaseAuth);

module.exports = router;
