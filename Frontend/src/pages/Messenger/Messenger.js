import { useContext, useEffect, useState } from "react"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/Message/Message"
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from "../../context/AuthContext"
import "./Messenger.css"
import  axios from "axios";


export default function Messenger() {
const  [conversations, setConversations] = useState([]);
const {user}  = useContext(AuthContext);


useEffect(()=>{
  const getConversations = async ()=>{



    try {
  
      
      const res = await axios.get("/conversations/" + user._id);
  
      console.log(res);
      
      setConversations(res.data);
      
    } catch (error) {
      console.log("your Error is " +error);
      
    }
  };
  getConversations();
}, [user._id]);

// console.log(user);



  return (
      <>
      <Topbar/>
    <div className = "messanger">
       <div className="chatMenu">
<div className="chatMenuWrapper">
  <input type="text" className="chatMenuInput" placeholder="Search for Friends" />
 
 {conversations.map((c)=>(

  <Conversation conversation={c} currentUser={user}/>
 ))}
 
  
</div>
       </div>


       <div className="chatBox">
<div className="chatBoxWrapper">
<div className="chatBoxTop">
<Message/>
<Message own={true}/>
<Message/>
<Message/>
<Message/>
<Message/>
<Message/>
<Message/>
<Message/>
<Message/>
<Message/>
<Message/>
  </div>

  <div className="chatBoxBottom">
    <textarea placeholder="say something!" className="chatBoxBottomTextArea"></textarea>
    <button className="chatsendBtn">Send
      </button>
    </div>
</div>
       </div>


       <div className="chatOnline">
<div className="chatOnlineWrapper">
  <ChatOnline/>
</div>
       </div>




    </div>
    </>
  )
}
