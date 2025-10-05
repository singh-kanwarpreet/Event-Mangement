const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");
const Attendance = require("../models/attendance.js");

const DEGREE_OPTIONS = [
  "CSE",
  "IT",
  "Mechanical",
  "Civil",
  "Electrical",
  "Electronics",
];
const YEAR_OPTIONS = ["1st", "2nd", "3rd", "4th"];

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No or invalid token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "SECRETKEY");

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can access this route" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Upload Event
router.post("/upload", verifyAdmin, async (req, res) => {
  try {
    const { name, description, date, time, image, degrees, years } =
      req.body.data;

    if (!name || !description || !date || !time || !degrees || !years) {
      return res.status(400).json({
        message: "All fields including degrees and years are required.",
      });
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
      createdBy: req.user.id,
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

router.post("/send-certificate", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      { certificate: true },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json({ message: "Certificate sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit Event
router.post("/edit", verifyAdmin, async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      date,
      time,
      certificate,
      image,
      degrees,
      years,
    } = req.body;

    if (!id || !name || !description || !date || !time || !degrees || !years) {
      return res.status(400).json({
        message: "All fields including degrees and years are required.",
      });
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
      createdBy: req.user.id,
    };

    if (image) {
      eventData.image = image;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, eventData, {
      new: true,
    });

    return res.json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Event
router.post("/delete", verifyAdmin, async (req, res) => {
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

// Get Participants of an Event with Attendance
router.get("/event/:id/participants", async (req, res) => {
  try {
    const eventId = req.params.id;

    // Populate participants (each one is a User)
    const event = await Event.findById(eventId).populate({
      path: "participants",
      select: "name urn crn branch year",
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Fetch attendance for this event
    const attendanceRecords = await Attendance.find({ event: eventId });

    // Merge attendance info with participants
    const participantsWithAttendance = event.participants.map((user) => {
      const attendance = attendanceRecords.find(
        (a) => a.user.toString() === user._id.toString()
      );

      return {
        _id: user._id,
        name: user.name,
        urn: user.urn,
        crn: user.crn,
        branch: user.branch,
        year: user.year,
        present: attendance ? attendance.present : false, // default false
      };
    });

    res.json(participantsWithAttendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put("/update-attendance", verifyAdmin, async (req, res) => {
  try {
    const { eventId, participants } = req.body;
    // participants should be an object: { userId1: true, userId2: false, ... }

    if (!participants || typeof participants !== "object") {
      return res.status(400).json({ message: "Participants must be an object" });
    }

    // Convert object to array of [userId, present] pairs
    const entries = Object.entries(participants);

    // Loop and upsert each attendance record
    for (const [userId, present] of entries) {
      await Attendance.findOneAndUpdate(
        { event: eventId, user: userId },
        { present },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ message: "Failed to update attendance", error: err.message });
  }
});

module.exports = router;
