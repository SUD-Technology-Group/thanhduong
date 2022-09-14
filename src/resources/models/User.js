const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['seller', 'admin'], required: true },
});

module.exports = mongoose.model('User', User);
