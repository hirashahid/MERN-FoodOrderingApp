const express = require('express');
const router = express.Router()
const Cart = require('../models/cartModel');

router.post("/addToCart", async (req, res) => {
    const { name, userId, itemId, image, varient, quantity, price, prices, category, restaurant } = req.body
    try {
        const cartItem = await Cart.find({ name, varient, userId })
        if (cartItem.length > 0) {
            Cart.updateOne(
                {
                    "name": name,
                    "varient": varient
                },
                {
                    $set: {
                        "quantity": quantity,
                        "price": price
                    }
                }, function (err, doc) {
                    if (err) console.log(err);
                    else if (doc) console.log(JSON.stringify(doc))
                }
            );
        }
        else {
            const cartItem = new Cart({ name, userId, itemId, varient, price, prices, category, image, quantity, restaurant });
            try {
                cartItem.save()
                res.send('Item Added to Cart')
            } catch (error) {
                return res.status(400).json({ message: error })
            }
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/getCart", async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.body._id })
        res.send(cart);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/deleteFromCart", async (req, res) => {
    const { userId, name, varient } = req.body;
    try {
        await Cart.deleteOne({ name: name, userId: userId, varient: varient })
        res.send('Item has been deleted');
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/clearCart", async (req, res) => {
    const { _id } = req.body;
    await Cart.deleteMany({ userId: _id })
    res.send('Item deleted');

});

router.post("/deleteSelectedItems", async (req, res) => {
    const selectedItems = req.body;
    selectedItems.map(async (selectedItem) => await Cart.deleteOne({ _id: selectedItem }))
    res.send('Item deleted');
});

module.exports = router;