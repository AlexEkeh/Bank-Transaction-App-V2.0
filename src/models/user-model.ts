import { Schema, model } from 'mongoose';


// USER REGISTRATION SCHEMA

const UserSchema = new Schema({
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
})


// USER REGISTRATION MODEL

const User = model('User', UserSchema);



export default User;