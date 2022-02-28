const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

//update user
router.put("/:id", async (req,res)=>{
if (req.body.userId === req.params.id || req.body.isAdmin) {
    if(req.body.password){
try{
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
}catch(err){
    return res.status(500).json(err);

}

    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        })
        res.status(200).json("Your account has updated successfully!")
    } catch (error) {
    return res.status(500).json(err);
        
    }

}else{
    return res.status(403).json("You can update ONLY your account");
}

})





//delete user
router.delete("/:id", async (req,res)=>{
    if (req.body.userId === req.params.id || req.body.isAdmin) {
 
    
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Your account has deleted successfully!")
        } catch (error) {
        return res.status(500).json(err);
            
        }
    
    }else{
        return res.status(403).json("You can delete ONLY your account");
    }
    
    })


    // localhost:8000/users?username=tuffy
    // localhost:8000/users?userId=tuffy
    //this means  here we fetching the data using userid or user name

//get a user
  router.get("/", async (req,res)=>{
      const userId = req.query.userId;
      const username = req.query.username;
try {
    const user = userId ? await User.findById(userId) :
    await User.findOne({username: username})
    const{password,updatedAt,...other} = user._doc;  //this line says that dont give me user password and updatedAt info and give reamaining ones(others) from user document(_doc).
        res.status(200).json(other);
    
} catch (error) {
    return res.status(500).json(error);   
}
  });


  //get friends
  router.get("/friends/:userId", async (req,res) =>{
      try {
          const user = await User.findById(req.params.userId);
          const friends = await Promise.all(
              user.followings.map(friendId=>{
                  return User.findById(friendId);
              })
          )
let friendList = [];
friends.map(friend=>{
    const {_id,username,profilePicture} = friend;
     friendList.push({_id,username,profilePicture});
});
res.status(200).json(friendList);


      } catch (err) {
          res.status(500).json(err);
      }
  })






//follow user

router.put("/:id/follow", async (req,res) =>{
    if(req.body.userId !== req.params.id){         //this line for not Following yourself
        try{
            const user = await User.findById(req.params.id);             //finding the user you want to follow
            const currentUser = await User.findById(req.body.userId);          //grabing the current userid who wants to follow
            if(!user.followers.includes(req.body.userId)){           //checking if Currentuser is already following the user or not
                await user.updateOne({$push : {followers: req.body.userId}});           //updating the followers 
                await currentUser.updateOne({$push : {followings: req.params.id}});        //updating the followings
            
                res.status(200).json("User has been Followed")
            
            }else{
                res.status(403).json("You are already Following this user!")
            }
        }
            catch{

            }
    }else{
        res.status(500).json("You can't Follow yourself")
    }
})








//unfollow  user
//major changes from follow endpoint is unfollow,!,$pull and obviously messages
router.put("/:id/unfollow", async (req,res) =>{             
    if(req.body.userId !== req.params.id){          //checking the user id is matching or not
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : {followers: req.body.userId}});
                await currentUser.updateOne({$pull : {followings: req.params.id}});
            
                res.status(200).json("User has been unfollowed")
            
            }else{
                res.status(403).json("You don't follow this User!")
            }
        }
            catch{

            }
    }else{
        res.status(500).json("You can't unfollow yourself")
    }
})
module.exports = router