const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  urn: { type: Number, required: true, unique: true },

  crn: { type: Number, required: true, unique: true },

  branch: {
    type: String,
    required: true,
    enum: ['CSE', 'IT', 'Electronics', 'Electrical', 'Mech', 'Civil'],
  },

  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th'],
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  eventRegistered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
