const jwt = require('jsonwebtoken')
const User  = require('../models/userModel');

// Create Token
exports.createToken = (id, email) => {
    const token = jwt.sign(
        {
            id, email
        }, process.env.SECRET_KEY,
        {
            expiresIn: '5d'
        }
    )

    return token;
}


// Check is Authenticated
exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                isLogin: false,
                message: "Missing Token"
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    isLogin: false,
                    message: err.message
                });
            }

            try {
                const user = await User.findById(decoded.id).select('-password');

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        isLogin: false,
                        message: "User not found"
                    });
                }


                req.user = user;
                next();
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
