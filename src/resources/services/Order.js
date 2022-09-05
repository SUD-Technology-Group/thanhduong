const { Order } = require('../models');

const OrderService = {
    get: async (payloads) => {
        return await Order.findOne(payloads).populate('customer', 'products').lean();
    },

    getAll: async () => {
        return await Order.find({}).populate('customer', 'products').lean();
    },

    create: async (payloads) => {
        return await Order.create(payloads);
    },

    update: async (slug, payloads) => {
        return await Order.findOneAndUpdate({ slug }, payloads);
    },

    delete: async (slug) => {
        return await Order.findOneAndDelete({ slug });
    },
};

module.exports = OrderService;
