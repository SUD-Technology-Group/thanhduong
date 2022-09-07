const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true },
        images: { type: [String], required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        property: {
            new: Boolean,
            feature: Boolean,
        },
        description: { type: String },
        price: {
            origin: Number,
            sale: Number,
        },
        amount: { type: Number, required: true },
        slug: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
