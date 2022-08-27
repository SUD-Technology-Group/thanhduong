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

    update: async (slug, payloads) => {
        return await Product.findOneAndUpdate({ slug }, payloads);
    },

    delete: async (slug) => {
        return await Product.findOneAndDelete({ slug });
    },
};

module.exports = ProductService;
