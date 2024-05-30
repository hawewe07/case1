const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a booking
router.post('/', auth, async (req, res) => {
    const { petName, gender, breed, age, preferences, service, servicePrice, startDate, endDate } = req.body;
    try {
        const newBooking = new Booking({
            userId: req.user.id,
            petName,
            gender,
            breed,
            age,
            preferences,
            service,
            servicePrice,
            startDate,
            endDate
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all bookings or bookings by user ID
router.get('/', auth, async (req, res) => {
    try {
        let bookings;
        if (req.query.userId) {
            bookings = await Booking.find({ userId: req.query.userId });
        } else {
            bookings = await Booking.find();
        }
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update booking
router.put('/:id', auth, async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        let booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        booking.startDate = startDate || booking.startDate;
        booking.endDate = endDate || booking.endDate;

        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete booking
router.delete('/:id', auth, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Booking deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
