const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/event_management');
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB;