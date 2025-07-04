const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image:{type: String, default: "https://thumbs.dreamstime.com/b/colorful-confetti-celebration-bright-pastel-background-creating-festive-atmosphere-unknown-event-occasion-364679215.jpg"},
    participants: [{ type : mongoose.Schema.ObjectId, ref: 'User' }],
    date: {type: Date, required: true},
    time: { type: String, required: true },
    certificate: { type: String},
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
