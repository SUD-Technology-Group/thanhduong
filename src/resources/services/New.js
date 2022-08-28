const { New } = require('../models');

const NewService = {
    get: async (payloads) => {
        return await New.findOne(payloads).lean();
    },

    getAll: async () => {
        return await New.find({}).lean();
    },

    create: async (payloads) => {
        return await New.create(payloads);
    },

    update: async (slug, payloads) => {
        return await New.findOneAndUpdate({ slug }, payloads);
    },

    delete: async (slug) => {
        return await New.findOneAndDelete({ slug });
    },
};

module.exports = NewService;
