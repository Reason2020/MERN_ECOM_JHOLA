const mongoose = require('mongoose');
const {
    info, error
} = require('../utils/messageLogger');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    isSuperAdmin: {
        type: Boolean
    }
}, { timestamps: true });

module.exports.adminModel = mongoose.model('Admin', adminSchema);