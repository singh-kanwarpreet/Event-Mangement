const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

const DEGREE_OPTIONS = ['CSE', 'IT', 'Mechanical', 'Civil', 'Electrical', 'Electronics'];
const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th'];

router.post('/upload', async (req, res) => {
    try {
        const { name, description, date, time, token, image, degrees, years } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can create events" });
        }

        if (!name || !description || !date || !time || !degrees || !years) {
            return res.status(400).json({ message: "All fields including degrees and years are required." });
        }

        for (const degree of degrees) {
            if (!DEGREE_OPTIONS.includes(degree)) {
                return res.status(400).json({ message: `Invalid degree: ${degree}` });
            }
        }
        for (const year of years) {
            if (!YEAR_OPTIONS.includes(year)) {
                return res.status(400).json({ message: `Invalid year: ${year}` });
            }
        }

        const eventData = {
            name,
            description,
            date,
            time,
            degrees,
            years,
            createdBy: decoded.id
        };

        if (image) {
            eventData.image = image;
        }

        const event = new Event(eventData);
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
        const { id, name, description, date, time, certificate, token, image, degrees, years } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can edit events" });
        }

        if (!id || !name || !description || !date || !time || !degrees || !years) {
            return res.status(400).json({ message: "All fields including degrees and years are required." });
        }

        for (const degree of degrees) {
            if (!DEGREE_OPTIONS.includes(degree)) {
                return res.status(400).json({ message: `Invalid degree: ${degree}` });
            }
        }
        for (const year of years) {
            if (!YEAR_OPTIONS.includes(year)) {
                return res.status(400).json({ message: `Invalid year: ${year}` });
            }
        }

        const eventData = {
            name,
            description,
            date,
            time,
            certificate,
            degrees,
            years,
            createdBy: decoded.id
        };

        if (image) {
            eventData.image = image; 
        }

        await Event.findByIdAndUpdate(id, eventData);
        return res.json({ message: "Event updated successfully" });

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(500).json({ message: err.message });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { id, token } = req.body;

        const decoded = jwt.verify(token, 'SECRETKEY');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can delete events" });
        }

        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(500).json({ message: err.message });
    }
});

router.get('/event/:id/participants', async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId).populate('participants', 'name email crn urn branch year');

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        let yearParticipation = {};

        event.participants.forEach(participant => {
            const year = participant.year;
            if (!yearParticipation[year]) {
                yearParticipation[year] = [];
            }
            yearParticipation[year].push(participant);
        });

        res.json(yearParticipation );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
