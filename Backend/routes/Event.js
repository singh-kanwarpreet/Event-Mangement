const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');


router.get('/show', async (req, res) => {
    try {
        const events = await Event.find(); 
        res.json(events); 
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/upload',async(req,res)=>{
    try{
        console.log("hello")
        let {name,description,date,time,token} = req.body;
        let decoded = jwt.verify(token, 'SECRETKEY');
        if(decoded.role == 'admin'){
        const event = new Event({name,description,date,time,createdBy: decoded.id})
        await event.save();
        res.json({message: "Successfully event created"})}
        return res.status(498).json({message: "Invalid Token"});
    }
    catch(err){
        res.status(500).json({ message: err.message });

    }
})

module.exports = router;