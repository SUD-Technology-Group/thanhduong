const Product = require('../models/Product');

const ProductService = {
    getById: async (id) => {
        const product = await Product.findOne({ _id: id });
        return product.toObject();
    },

    getAll: async () => {
        const products = await Product.find({});
        return products.map((product) => product.toObject());
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
