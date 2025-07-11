const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
let User = require('../models/user');

router.post("/registered", async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, 'SECRETKEY');

        if (decoded.role !== 'user') {
            return res.status(403).json({ message: "Not Authorized" });
        }

        const user = await User.findById(decoded.id).select('eventRegistered -_id');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ registeredEvents: user.eventRegistered });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
