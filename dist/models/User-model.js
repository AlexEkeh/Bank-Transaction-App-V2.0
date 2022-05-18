"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// USER REGISTRATION SCHEMA
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please enter an email address']
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: [true, 'Please enter a password']
    }
});
// USER REGISTRATION MODEL
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
