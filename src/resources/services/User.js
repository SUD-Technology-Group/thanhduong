const { User } = require('../models');

const UserService = {
    get: async (payloads, field) => {
        return await User.findOne(payloads, field).lean();
    },

    create: async (payloads) => {
        return await User.create(payloads);
    },

    update: async (username, payloads) => {
        return await User.findOneAndUpdate({ username }, payloads);
    },

    delete: async (username) => {
        return await User.findOneAndDelete({ username });
    },
};

module.exports = UserService;
