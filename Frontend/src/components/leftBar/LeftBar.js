import  "./LeftBar.css"
import {Bookmark, Chat, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline,Event} from "@material-ui/icons"
import {Users} from "../../dummyData";
import LeftBarFriend from "../leftbarFriends/LeftBarFriend";
export default function LeftBar() {
    return (
        <div className ="LeftBar">
            <div className="leftBarWrapper">
                <ul className="LeftBarList">
                    <li className="LeftBarItem">
                     <RssFeed className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Feed</span>
                    </li>
                    <li className="LeftBarItem">
                     <Chat className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Chats</span>
                    </li>
                    <li className="LeftBarItem">
                     <PlayCircleFilledOutlined className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Videos</span>
                    </li>
                    <li className="LeftBarItem">
                     <Group className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Groups</span>
                    </li>
                    <li className="LeftBarItem">
                     <Bookmark className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Bookmarks</span>
                    </li>
                    <li className="LeftBarItem">
                     <HelpOutline className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Questions</span>
                    </li>
                    <li className="LeftBarItem">
                     <WorkOutline className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Jobs</span>
                    </li>
                    <li className="LeftBarItem">
                     <Event className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Events</span>
                    </li>
                    <li className="LeftBarItem">
                     <School className= "LeftBarIcon"/>
                     <span className="LeftBarItemText">Courses</span>
                    </li>
                </ul>
                <button className="LeftBarBtn">
                    Show More
                </button>
                <hr className="LeftBarHr"/>
                <ul className="LeftBarFriendList">
                   {Users.map((u)=>(
                     <LeftBarFriend key={u.id}  users={u}/>  
                   ))}
                   
                </ul>
            </div>
        </div>
    )
}
