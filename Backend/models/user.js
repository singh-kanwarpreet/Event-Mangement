const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    urn: {type : Number, required: true, unique: true},
    class:{type:String, required: true},
    section:{type:String, required: true},
    crn:{type:Number, required: true, unique: true},
    eventRegistered:[{
       type : mongoose.Schema.Types.ObjectId, ref : 'Event'
    }]
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;