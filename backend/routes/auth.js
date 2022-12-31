const express=require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="Sachiisaawesomeguy";
var fetchuser=require('../middleware/fetchuser');
const { FOCUSABLE_SELECTOR } = require('@testing-library/user-event/dist/utils');



//Route 1 :Create a User : No login required
router.post('/createuser',[
    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
],async(req,res)=>{
  let success=false;
//if there is any error return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
    let user=await User.findOne({email: req.body.email});
    if (user){
      return res.status(400).json({success,error:"Sorry, Email already exists"})
    }
    const salt=await bcrypt.genSalt(10);
  
    const secPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,jwtSecret);
      success=true
      // res.json(user)
      res.json({success,authtoken})
    } catch(error){
      console.error(error.message);
      res.status(500).send("Server Error");
    }
})



// Route 2: Authenticate a user : No login Required;
router.post('/login',[
  
  body('email','Enter a valid email').isEmail(),
  body('password','Password can not be blank').exists(),
  
],async(req,res)=>{
  let success=false;

//if there is any error return bad req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body;

  try{
    const user= await User.findOne({email});
    if (!user){
      success=true;
      return res.status(400).json({success,error:"Invalid Credentials"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if (!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"Invalid Credentials"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,jwtSecret);
    success=true;
    res.json({success,authtoken})
  }catch(error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }


});



// Route 3 :Get the logged in user details: login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports=router 