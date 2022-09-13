const { Order } = require('../models');

const OrderService = {
    get: async (payloads, field) => {
        const order = await Order.findOne(payloads, field).populate('customer items.product').lean();
        order.createdAt = order.createdAt.toLocaleString('vi-VN');
        return order;
    },

    getAll: async () => {
        const orders = await Order.find({}).populate('customer items.product').lean();
        orders.map((order) => {
            order.createdAt = order.createdAt.toLocaleString('vi-VN');
        });
        return orders;
    },

    create: async (payloads) => {
        return await Order.create(payloads);
    },

    update: async (code, payloads) => {
        return await Order.findOneAndUpdate({ code }, payloads);
    },

    delete: async (code) => {
        return await Order.findOneAndDelete({ code });
    },
};

module.exports = OrderService;
