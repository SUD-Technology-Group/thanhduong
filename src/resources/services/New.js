const { New } = require('../models');

const NewService = {
    get: async (payloads, field) => {
        const newObj = await New.findOne(payloads, field).lean();
        newObj.updatedAt = newObj.updatedAt.toLocaleString("vi-VN");
        return newObj
    },

    getAll: async () => {
        const news =  await New.find({}).lean();
        news.map((newObj) => {
            newObj.updatedAt = newObj.updatedAt.toLocaleString('vi-VN');
        });
        return news
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
