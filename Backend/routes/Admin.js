const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

const DEGREE_OPTIONS = ['CSE', 'IT', 'Mechanical', 'Civil', 'Electrical', 'Electronics'];
const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th'];

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No or invalid token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'SECRETKEY');

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can access this route" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Upload Event
router.post('/upload', verifyAdmin, async (req, res) => {
    try {
        const { name, description, date, time, image, degrees, years } = req.body.data;
       
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
            createdBy: req.user.id
        };

        if (image) {
            eventData.image = image;
        }

        const event = new Event(eventData);
        const response = await event.save();

        return res.json({ message: response });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Edit Event
router.post('/edit', verifyAdmin, async (req, res) => {
    try {
        const { id, name, description, date, time, certificate, image, degrees, years } = req.body;

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
            createdBy: req.user.id
        };

        if (image) {
            eventData.image = image;
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, eventData, { new: true });

        return res.json({ message: "Event updated successfully", updatedEvent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Event
router.post('/delete', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.body;

        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get Participants of an Event
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

        res.json(yearParticipation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
