const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, default: 'user'},
    eventCreated: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }],
})
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;