const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const New = new Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('New', New);
