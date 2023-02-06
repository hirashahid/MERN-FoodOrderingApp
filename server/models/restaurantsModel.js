const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    name: { type: String, require },
}, {
    timestamps: true,
})

module.exports = mongoose.model('restaurant', restaurantSchema);