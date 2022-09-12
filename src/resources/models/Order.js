const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        code: String,
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: Number,
                total: Number,
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);
