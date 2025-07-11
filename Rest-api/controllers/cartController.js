const cartModel = require('../models/cartModel');
function addToCart(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;

    cartModel.create(
        { userId, items: [{ phone: phoneId }] }
    )
    .then(cart => res.status(200).json(cart))
    .catch(next); 
    
}