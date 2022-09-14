const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

module.exports = mongoose.model('Customer', Customer);
