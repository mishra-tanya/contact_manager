// model/contact.js

const mongoose = require('mongoose');

// Define the schema for the contact collection
const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model assuming you have one for storing user details
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

// Create a model for the contact collection
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
