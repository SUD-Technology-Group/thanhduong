const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const New = new Schema(
    {
        title: { type: String, required: true},
        image: { type: String, required: true},
        content: { type: String, required: true },
        description: { type: String, required: true },
        slug: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('New', New);
