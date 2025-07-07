const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

router.post('/upload', async (req, res) => {
    try {
        const { name, description, date, time, token } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can create events" });
        }

        const event = new Event({
            name,
            description,
            date,
            time,
            createdBy: decoded.id
        });

        await event.save();
        return res.json({ message: "Event created successfully" });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

