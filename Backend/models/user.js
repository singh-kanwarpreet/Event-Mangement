const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    urn: {type : Number, required: true, unique: true},
    role: {type : String, required: true, enum: ['admin', 'user']},
    class:{type:String, required: true},
    section:{type:String, required: true},
    crn:{type:Number, required: true, unique: true},
    eventRegisterd:[{
       type : mongoose.Schema.Types.ObjectId, ref : 'Event'
    }]
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;