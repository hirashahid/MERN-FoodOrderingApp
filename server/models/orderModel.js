const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name: { type: String, require },
    subtotal: { type: Number, require },
    phone: { type: Number, require },
    address: { type: String, require },
    currentUser: { type: String, require },
    cartItems: [],
    statustime: { type: String, require, default: 'Not Processed' },
    status: { type: String, default: 'Ordered' }
}, {
    timestamps: true,
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel;