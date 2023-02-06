const express = require('express');
const router = express.Router()
const Restaurant = require('../models/restaurantsModel');

router.get("/getrestaurant", async (req, res) => {
    try {
        const restaurant = await Restaurant.find({})
        res.send(restaurant);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/addrestaurant", async (req, res) => {
    const { restaurant } = req.body;

    try {
        const newRestaurant = new Restaurant({
            name: restaurant,
        })
        await newRestaurant.save()
        console.log(JSON.stringify(newRestaurant));
        const restaurants = await Restaurant.find({})
        res.send(restaurants);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

module.exports = router;