const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Chờ xử lý', 'Đang chuẩn bị', 'Vận chuyển', 'Hoàn thành'],
        date: Date,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Order', Order);
