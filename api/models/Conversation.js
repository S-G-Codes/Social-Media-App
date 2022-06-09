const mongoose = require("mongoose");

const  ConversationSchema = new mongoose.Schema(
    {
   
           members:{
               type: Array,
           },

    },
    
    //timestamp for updating when new user is added or updated
    {timestamps: true}






);

module.exports = mongoose.model("Conversation" , ConversationSchema);


