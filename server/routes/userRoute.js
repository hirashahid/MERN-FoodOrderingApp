const express = require("express");
const router = express.Router();
const User = require('../models/userModel');

router.post("/register", (req, res) => {
    const { name, username, email, password } = req.body
    const newUser = new User({ name, username, email, password })
    try {
        newUser.save()
        res.send(newUser);
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email, password })
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                username: user[0].username,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.send(currentUser);
        }
        else {
            return res.status(400).json({ message: 'User Not Found' })
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.get("/allusers", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/deleteuser", async (req, res) => {
    const userId = req.body.userId
    console.log(userId)
    try {
        await User.findOneAndDelete({ _id: userId });
        res.send('User has been deleted');
    } catch (err) {
        res.status(404).json({ message: err.stack })
    }
});

router.post("/makeadmin", async (req, res) => {
    const userId = req.body.userId
    try {
        const user = await User.findOne({ _id: userId })
        user.isAdmin = true
        await user.save()
        res.send('User is admin now');
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});
module.exports = router;