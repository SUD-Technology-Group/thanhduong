const { Product } = require('../models');

const ProductService = {
    get: async (payloads) => {
        return await Product.findOne(payloads).lean();
    },

    getAll: async () => {
        return await Product.find({}).lean();
    },

    create: async (payloads) => {
        return await Product.create(payloads);
    },

    update: async (id, payloads) => {
        return await Product.findOneAndUpdate({ _id: id }, payloads);
    },

    delete: async (id) => {
        return await Product.findOneAndDelete({ _id: id });
    },
};

module.exports = ProductService;
