const { Order } = require('../models');

const OrderService = {
    get: async (payloads, field) => {
        const order = await Order.findOne(payloads, field).populate('customer items.product').lean();
        if (order.createdAt && order.updatedAt) {
            order.createdAt = order.createdAt.toLocaleString('vi-VN');
            order.updatedAt = order.updatedAt.toLocaleString('vi-VN');
        }
        return order;
    },

    getMany: async (payloads, field) => {
        const orders = await Order.find(payloads, field).populate('customer items.product').lean();
        orders.map((order) => {
            if (order.createdAt && order.updatedAt) {
                order.createdAt = order.createdAt.toLocaleString('vi-VN');
                order.updatedAt = order.updatedAt.toLocaleString('vi-VN');
            }
        });
        return orders;
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
