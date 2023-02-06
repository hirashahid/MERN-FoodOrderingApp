const express = require('express');
const router = express.Router()
const Category = require('../models/categoryModel');

router.get("/getcategories", async (req, res) => {
    try {
        const categories = await Category.find({})
        res.send(categories);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

router.post("/addcategory", async (req, res) => {
    const { category } = req.body;

    try {
        const newCategory = new Category({
            name: category,
        })
        await newCategory.save()
        const categories = await Category.find({})
        res.send(categories);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

module.exports = router;