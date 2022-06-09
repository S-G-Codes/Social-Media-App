import "./conversation.css"
import {  useEffect, useState } from "react"
import axios from "axios";

export default function Conversation({conversation ,currentUser}) {

  const [user,setUser] = useState(null);

  useEffect(()=>{
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async ()=>{
      try {
        
        const res = await axios("/users?userId=" + friendId);
       console.log(res);
      setUser(res.data);

       
      } catch (error) {
        console.log(error);
        
      }
    };
    getUser();
  },
  [currentUser , conversation]);







  return (
    <div className="conversation">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4sE0FRmE66Oc3qVVQ5dxKgHaE8%26pid%3DApi&f=1" alt="" className="conversationImg" /> 
  <span className="conversationName"> {user.username}</span>
    </div>
  )
}
