const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: { type: String, require },
    varients: [],
    prices: [],
    category: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
    restaurant: { type: String, require },
    orderCount: { type: Number, default: 0 },
    status: { type: String, default: 'Normal' }
}, {
    timestamps: true,
})

const itemModel = mongoose.model("items", itemSchema)

module.exports = itemModel;