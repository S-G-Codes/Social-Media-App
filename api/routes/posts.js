const router = require("./auth");
const post = require("../models/Post");
const Post = require("../models/Post");
const User = require("../models/User");

const route = require("express").Router();

//checking the post endpoint
// router.get("/",(req,res)=>{
//     console.log('This is the Post Page');
    
// })



//create a post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
        
    }
})

//Update the post
router.put("/:id", async (req,res)=>{
    try{
 const post = await Post.findById(req.params.id);       //finding user by their id
 if(post.userId === req.body.userId){                 //cond for checking userId and  objectId is matching or not
   await post.updateOne({$set:req.body});
   res.status(200).json("Your Post has been updated")
 }else{
res.status(403).json("You can update ONLY your post!")
 }
    }catch(err){
        
        res.status(500).json(err)

    }

})



//delete a post
router.delete("/:id", async (req,res)=>{
    try{
 const post = await Post.findById(req.params.id);       //finding user by their id
 if(post.userId === req.body.userId){                 //cond for checking userId and  objectId is matching or not
   await post.deleteOne();
   res.status(200).json("Your Post has been deleted!")
 }else{
res.status(403).json("You can delete ONLY your post!")
 }
    }catch(err){
        
        res.status(500).json(err)

    }

})

//like and dislike  a post
router.put("/:id/like", async (req,res)=>{

    try {
        const post = await Post.findById(req.params.id);      //finding user by id
        if(!post.likes.includes(req.body.userId)){            //checking that post is liked already or not 
            await post.updateOne({$push : {likes: req.body.userId}});    //if post is not liked then liking now 
            res.status(200).json("The Post has been Liked!")

        }else{
          await  post.updateOne({$pull: {likes: req.body.userId}});          //dislikein the post
           res.status(200).json("The Post has been disliked!")
        }
        
    }catch (error) {
        res.status(500).json(error)
        
    }


});


//get a post

router.get("/:id",async(req,res)=>{
    try {
        const post = await  Post.findById(req.params.id);       //getting the post by id
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})



//get timeline posts
router.get("/timeline/:userId",async(req,res)=>{
 try {
     
const currentUser = await User.findById(req.params.userId);       //finding the current user by userid
const userPosts = await Post.find({userId : currentUser._id});           //find posts of current user by id
const friendPosts = await Promise.all(                          //finding thier freinds posts(following ones)   and returnin to the current User 
    currentUser.followings.map((friendId)=>{                        //promise is use to make sure that no post remains to fetch
    return    Post.find({userId: friendId});
    })
);
res.status(200).json(userPosts.concat(...friendPosts));                       //Contacting the all friends post and userpost and displaying it

 } catch (error) {
     res.status(500).json(error);
 }

});



//get user all posts 
router.get("/profile/:username",async(req,res)=>{
 try {
     const user = await  User.findOne({username:req.params.username})
     const posts = Post.find({userId: user_id});    
     res.status(200).json(posts);     

 } catch (error) {
     res.status(500).json(error);
 }

});

module.exports = router;