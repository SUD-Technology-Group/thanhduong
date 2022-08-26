const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true, unique: true },
        imgs: { type: [String] , required: true},
        category: { type: String , required: true},
        parameter: { type: String },
        description: { type: String },
        price: { type: Number },
        amount: { type: Number },
        slug: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
