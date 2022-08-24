const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String },
        imgs: { type: [String] },
        category: { type: String },
        parameter: { type: String },
        description: { type: String },
        price: { type: {}, default: 'Liên hệ' },
        amount: { type: Number },
        slug: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
