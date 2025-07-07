const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET all events
router.get('/show', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// POST register user to event
router.post('/:id/register', async (req, res) => {
    try {
        const id = req.params.id;
        const { token } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: "Only users can register for events" });
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        
        if (!event.participants.includes(decoded.id)) {
            event.participants.push(decoded.id);
            await event.save();
            const user = await User.findById(decoded.id);
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
