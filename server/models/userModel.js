const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please enter a valid email address',
        },
    },
    avatar: {
        type: String, // Base64-encoded data
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function (password) {
                return password.length >= 6;
            },
            message: 'Password must be at least 6 characters long',
        }
    },
    isGoogleAuth: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });




userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
