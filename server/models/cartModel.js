const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    name: { type: String, require },
    userId: { type: String, require },
    itemId: { type: String, require },
    varient: { type: String, require },
    price: { type: Number, require },
    prices: [],
    category: { type: String, require },
    image: { type: String, require },
    quantity: { type: Number, require },
    restaurant: { type: String, require },
}, {
    timestamps: true,
})

module.exports = mongoose.model('cart', cartSchema);