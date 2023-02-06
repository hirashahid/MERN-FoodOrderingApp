const express = require('express');
const Order = require('../models/orderModel');
const Items = require('../models/itemModel');
const router = express.Router();

const finditem = async (item) => {
    const targetItem = await Items.findOne({ name: item.name })
    targetItem.orderCount = targetItem.orderCount + 1
    targetItem.save();
}

router.post("/placeOrder", (req, res) => {
    let { values, currentUser, cartItems } = req.body;
    const { name, subtotal, phone, address } = values;
    values = values.values;
    currentUser = currentUser._id;
    cartItems.map(item => finditem(item))
    const order = new Order({ name, subtotal, phone, address, currentUser, cartItems });
    try {
        order.save()
        res.send('Order has been placed')
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/getuserorders", async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await Order.find({ currentUser: userId }).sort({ _id: -1 })
        res.send(orders);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.get("/getallorders", async (req, res) => {
    try {
        const orders = await Order.find({})
        res.send(orders);
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.post("/changeStatus", async (req, res) => {
    const { orderID, status } = req.body
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    try {
        const order = await Order.findOne({ _id: orderID })
        if (status === 'Cancelled' || status === 'Completed') order.statustime = `Time: ${time} Date: ${date}`;
        order.status = status
        await order.save()
        res.send('Órder delivered successfully');
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});
module.exports = router;
