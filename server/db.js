const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://root:root@cluster0.gjxmsam.mongodb.net/food-order';

mongoose.set("strictQuery", false);

mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on("connected", () => {
    console.log('db connected');
})

db.on('error', () => {
    console.log('db connection failed');
})

module.exports = mongoose