const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET all events
router.post('/show', async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, please login" });
        }

        const decoded = jwt.verify(token, 'SECRETKEY');

        if (decoded.role !== 'admin' && decoded.role !== 'user') {
            return res.status(403).json({ message: "Only admins and users can view events" });
        }
        if( decoded.role === 'admin') {
            const events = await Event.find();
            return res.json(events);
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user.branch, user.year);
        const events = await Event.find({
            degrees: user.branch,
            years: user.year
        });

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// POST register user to event
router.post('/:id/register', async (req, res) => {
    try {
        const id = req.params.id;
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, please login" });
        }
        const date = new Date();
        
        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: "Only users can register for events" });
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        // Check if event date and time is in the future
        if (!event.date || !event.time) {
            return res.status(400).json({ message: "Event date and time are required" });
        }
        const [hours, minutes] = event.time.split(':').map(Number);
        const eventDate = new Date(event.date);
        eventDate.setHours(hours, minutes, 0, 0);

        if (eventDate < date) {
            return res.status(400).json({ message: "Cannot register for past events" });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!event.degrees.includes(user.branch) || !event.years.includes(user.year)) {
            return res.status(403).json({ message: "User not eligible for this event" });
        }
        if (!event.participants.includes(decoded.id)) {
            event.participants.push(decoded.id);
            await event.save();
            user.eventRegistered.push(id);
            await user.save();
            return res.json({ message: "Registered successfully" });
        } else {
            return res.status(400).json({ message: "Already registered for this event" });
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
