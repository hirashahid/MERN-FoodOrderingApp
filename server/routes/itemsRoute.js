const express = require('express');
const router = express.Router()
const Items = require('../models/itemModel');

router.get("/getAllItems", async (req, res) => {
    try {
        const items = await Items.find({})
        res.send(items);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/addItem", async (req, res) => {
    const { item } = req.body;
    try {
        const newItem = new Items({
            name: item.name,
            image: item.image,
            description: item.description,
            category: item.category,
            restaurant: item.restaurant,
            varients: ['small', 'medium', 'large'],
            prices: [item.prices]
        })
        await newItem.save()
        res.send('Item has been added');
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/getitembyid", async (req, res) => {
    const { itemId } = req.body;
    try {
        const item = await Items.findOne({ _id: itemId })
        res.send(item);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/editItem", async (req, res) => {
    const { updatedItem } = req.body;
    console.log(JSON.stringify(updatedItem));
    try {
        await Items.updateOne(
            {
                _id: updatedItem._id,
            },
            {
                $set: {
                    "name": updatedItem.name,
                    "description": updatedItem.description,
                    "image": updatedItem.image,
                    "prices": updatedItem.prices,
                    "category": updatedItem.category,
                    "restaurant": updatedItem.restaurant
                }
            }, function (err, doc) {
                if (err) res.send(err)
                else if (doc) res.send('Item has been updated')
            }
        );
    } catch (err) {
        // return res.status(400).json({ message: err });
    }
});

router.post("/deleteItem", async (req, res) => {
    const itemId = req.body.itemId;
    try {
        await Items.findOneAndDelete({ _id: itemId });
        res.status(200).send('Pizza has been deleted')
    }
    catch (err) { res.status(400).json({ message: err }) }
});

router.post("/changeStatus", async (req, res) => {
    const itemId = req.body.itemId;
    try {
        const item = await Items.findOne({ _id: itemId })
        if (item.status === 'Normal') {
            item.status = 'Retired'
        } else item.status = 'Normal'
        await item.save()
        res.status(200).send('Pizza has been deleted')
    }
    catch (err) { res.status(400).json({ message: err }) }
});


module.exports = router;