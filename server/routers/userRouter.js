const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post("/",async(req,res)=>{
    try {
       const {userName, password, confirmPassword} =req.body;
       if(!userName || !password || !confirmPassword)
       {
           return res.status(500).json({ errorMessage : 'all fields are required'})
       } 
       if(password != confirmPassword)
       {
        return res.status(500).json({ errorMessage : 'password mismatch'})
    }
    const existingUser = await User.findOne({userName})
    if(existingUser)
    {
        return res.status(500).json({ errorMessage : 'user Already Exists'})
    }

    const salt = await bcrypt.genSalt();
    const userPassword = await bcrypt.hash(password, salt);

    const newUser = new User ({ userName, userPassword});
    const savedUser = newUser.save();
   
    const token = jwt.sign({
        id:savedUser._id
    },process.env.JWT_SECRET)

res.cookie("token",token,{
    httpOnly:true
}).send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post("/login",async(req,res)=>{
    try {
       const {userName, userPassword } =req.body;
       if(!userName || !userPassword ){
           return res.status(500).json({ errorMessage : 'all fields are required'})
       }      
    const existingUser = await User.findOne({userName})
    if(!existingUser){
        return res.status(500).json({ errorMessage : 'user does not Exists'})
    }

    const correctPassword = await bcrypt.compare(userPassword,existingUser.userPassword)

    if (!correctPassword)
    return res.status(401).json({
        errorMessage: "Wrong email or password.",
    });
   
    const token = jwt.sign({
        id:existingUser._id
    },process.env.JWT_SECRET)

res.cookie("token",token
   ,{ httpOnly:true
}).send();
    } catch (error) {
        res.status(500).send();
    }


})

router.get("/loggedIn",(req,res)=>{
    
    try {
        const token = req.cookies.token;
    
        if (!token) return res.json(null);
    
        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    
        res.json(validatedUser.id);
      } catch (err) {
        return res.json(null);
      }
})

router.get("/logout",(req,res)=>{
    try {
        res.cookie("token","",{
            httpOnly:true
        }).send();
    } catch (error) {
        res.json(null);
    }
})


module.exports = router;