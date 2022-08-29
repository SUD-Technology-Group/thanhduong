const { Category } = require('../models');

const CategoryService = {
    get: async (payloads) => {
        return await Category.findOne(payloads).populate('parent').lean();
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
