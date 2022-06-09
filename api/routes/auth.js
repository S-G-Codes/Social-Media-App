const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register",    async (req , res)=>{

  try {
   
   const userExits = await User.findOne({email : req.body.email});
  if(userExits){
    res.status(404).json("Sorry User with this Mail Exits!")
  }



    //Incrypting the new password by using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
   
    //Creating a new user
    const newUser =  await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    
    //Saving new user in DB
    const user = await newUser.save();
    res.status(200).json(user)
  } catch (error) {
        res.status(500).json(err);
  }
 });

 //Creating a Login Endpoint

   router.post("/login", async (req,res)=>{
  try {
    const user = await User.findOne({email : req.body.email});
    !user && res.status(404).json("Sorry User not Found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Sorry,Please check your password ")

res.status(200).json(user);

  } catch (err) {
    res.status(500).json(err);
    
  }

 })
















module.exports = router