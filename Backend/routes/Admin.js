const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

router.post('/upload', async (req, res) => {
    try {
        const { name, description, date, time, token,image } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can create events" });
        }

        const event = new Event({
            name,
            description,
            date,
            time,
            image,
            createdBy: decoded.id
        });

        const response = await event.save();
        return res.json({ message: response });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { id, name, description, date, time, certificate, token,image } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can edit events" });
        }

        // Validate required fields
        if (!id || !name || !description || !date || !time) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const event = {
            name,
            description,
            date,
            time,
            image,
            certificate,
            createdBy: decoded.id
        };

        await Event.findByIdAndUpdate(id, event);

        return res.json({ message: "Event updated successfully" });
        
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

