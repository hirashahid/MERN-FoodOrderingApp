const express = require("express");

const itemsRoute = require('./routes/itemsRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const cartRoute = require('./routes/cartRoutes');
const categoryRoute = require('./routes/categoriesRoutes');
const restaurantRoute = require('./routes/restaurantsRoutes');

const app = express();
const db = require("./db");


app.use(express.json());

app.use('/api/items/', itemsRoute);
app.use('/api/users/', userRoute);
app.use('/api/orders/', orderRoute);
app.use('/api/cart/', cartRoute);
app.use('/api/category/', categoryRoute);
app.use('/api/restaurant/', restaurantRoute);

app.get("/", (req, res) => {
    res.send('Hi');
});
app.listen(5000);