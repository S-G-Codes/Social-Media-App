const mongoose = require("mongoose");

const  MessageSchema = new mongoose.Schema(
    {
   
           conversationId:{
               type: String,
           },

           sender:{
               type: String,

           },
           text:{
               type: String,
           },

    },
    
    //timestamp for updating when new user is added or updated
    {timestamps: true}






);

module.exports = mongoose.model("Message" , MessageSchema);


