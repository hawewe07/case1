const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');

// @route    GET api/admin/profile
// @desc     Get admin profile
// @access   Private
router.get('/profile', adminAuth, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select('-password');
        res.json(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/admin/profile
// @desc     Update admin profile
// @access   Private
router.put('/profile', adminAuth, async (req, res) => {
    const { name, email, phone, profilePicture } = req.body;

    // Build admin object
    const adminFields = {};
    if (name) adminFields.name = name;
    if (email) adminFields.email = email;
    if (phone) adminFields.phone = phone;
    if (profilePicture) adminFields.profilePicture = profilePicture;

    try {
        let admin = await User.findById(req.user.id);

        if (admin) {
            // Update
            admin = await User.findByIdAndUpdate(
                req.user.id,
                { $set: adminFields },
                { new: true }
            );

            return res.json(admin);
        }

        res.status(404).json({ msg: 'Admin not found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
