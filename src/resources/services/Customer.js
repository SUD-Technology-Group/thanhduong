const { Customer } = require('../models');

const CustomerService = {
    get: async (payloads, field) => {
        return await Customer.findOne(payloads, field).lean();
    },

    getMany: async (payloads, field) => {
        return await Customer.find(payloads, field).lean();
    },

    getAll: async () => {
        return await Customer.find({}).lean();
    },

    create: async (payloads) => {
        return await Customer.create(payloads);
    },

    update: async (slug, payloads) => {
        return await Customer.findOneAndUpdate({ slug }, payloads);
    },

    delete: async (slug) => {
        return await Customer.findOneAndDelete({ slug });
    },
};

module.exports = CustomerService;
