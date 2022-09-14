const { Category } = require('../models');

const CategoryService = {
    get: async (payloads, field) => {
        return await Category.findOne(payloads, field).populate('parent').lean();
    },

    getMany: async (payloads, field) => {
        return await Category.find(payloads, field).populate('parent').lean();
    },

    getAll: async () => {
        return await Category.find({}).populate('parent').lean();
    },

    create: async (payloads) => {
        return await Category.create(payloads);
    },

    update: async (slug, payloads) => {
        return await Category.findOneAndUpdate({ slug }, payloads);
    },

    delete: async (slug) => {
        return await Category.findOneAndDelete({ slug });
    },
};

module.exports = CategoryService;
