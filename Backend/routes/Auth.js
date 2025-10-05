const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, urn, branch, year, crn } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      urn,
      branch,
      year,
      crn,
      role: 'user'
    });

    const result = await user.save();
    if (!result) return res.status(500).json({ message: 'User registration failed' });
    const token = jwt.sign(
      { id: result._id, email: result.email, role: result.role },
      'SECRETKEY', 
      { expiresIn: '7d' }
    );

    res.json({ token, role: result.role, id: result._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login',async(req,res)=>{

    try{
        let {email,password} = req.body;
        const admin  = await Admin.findOne({email});
        if(!!admin){
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid Email or Password" });
            const token = jwt.sign({ id : admin._id,email,role : 'admin'}, 'SECRETKEY');
            return res.json({token,role:'admin', id : admin._id})
        }
        const user  = await User.findOne({email});
        if(!!user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid Email or Password" });
            const token = jwt.sign({ id : user._id,email,role : 'user'}, 'SECRETKEY',{ expiresIn: "7d" });
            return res.json({token,role:'user', id: user._id});
        }
        else{
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }    
})

module.exports = router;