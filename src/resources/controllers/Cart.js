const CartController = {
    // GET /cart
    index: (req, res) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        res.render('cart', { success , error });
    },
};

module.exports = CartController;
