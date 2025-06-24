const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    eventCreated: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }],
})
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;