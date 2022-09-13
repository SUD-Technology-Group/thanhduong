const { Product } = require('../models');

const ProductService = {
    get: async (payloads, field) => {
        return await Product.findOne(payloads, field).populate('category').lean();
    },

    getMany: async (payloads, field) => {
        return await Product.find(payloads, field).populate('category').lean();
    },

    getAll: async () => {
        return await Product.find({}).populate('category').lean();
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
