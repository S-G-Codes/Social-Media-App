const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer  = require("multer");
const path = require("path");

//env file to keep credientials safe
dotenv.config();

//connecting with mongodb
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}) .then( ()=>{
console.log('Connected to MongoDB successfully!');

}).catch((error)=>{
   console.log("Couldn't connect to mongodb",error);
   
});

// below line says that if /images is the path dont make a post request instead just go to this path
app.use("/images",express.static(path.join(__dirname,"public/images")))

//middleware's

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
   destination:(req,file,cb) =>{
      cb(null, "public/images");
   },
   filename: (req,file,cb)=>{
      cb(null,req.body.name );

   },
});

const upload = multer( {storage : storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
try {
   return res.status(200).json("File uploaded Successfully!");
} catch (err) {
   console.log(err);
   
}

});

app.get("/",(req , res)=>{
   res.send("Welcome to our home page ")

})

// Testing our requests!
//  app.get("/users", (req,res)=>{
// res.send('User section!');
// })

 

//using endpoint created in routes folder
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


//listening our app at port 8000
app.listen(8800,()=>{
console.log('Backend Server has started!');



})