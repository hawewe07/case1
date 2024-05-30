const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    petName: String,
    gender: String,
    breed: String,
    age: Number,
    preferences: String,
    phone: String,
    profilePicture: String
});

module.exports = mongoose.model('User', UserSchema);
