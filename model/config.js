require('dotenv').config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
//mongodb://localhost:27017
    .then((result) => {
        console.log("Db Connected");
    })
    .catch((err) => {
        console.error("Db Failed to Connect:", err);
    });


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const collection = mongoose.model('signup', Schema);

module.exports = collection;

