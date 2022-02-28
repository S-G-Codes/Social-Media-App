import "./RightBar.css"
import {Users} from "../../dummyData";
import Online from "../online/Online"; 
import { useEffect, useContext ,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import {AuthContext} from "../../context/AuthContext";



export default function RightBar({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext); 
    const [followed,setFollowed] = useState(currentUser.followings.includes(user?.id));





    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFriends();
      }, [user]);

const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

    const HomeRightBar = ()=>{

        return (
        <>
         <div className="bdayContainer">
                    <img src="./images/gift.png" alt="" className="bdayImg" />
                    <span className="bdayText">
                       <b> RG Photography </b> and <b>and 4 others friends</b> have a birthday today
                    </span>
                </div>
                <img src="./images/add.png" alt="" className="rightBarAdd" />
              <h4 className="rightbarTitle">
                  Online Friends
              </h4>
              <ul className="rightBarFriendList">
               {Users.map((u) =>(                         //taking online user from dummpy data using map function
              <Online key={u.id} user={u}   />
               ))}
                 
              </ul>
        </>
        );
    };

    const ProfileRightBar = ()=>{
      
        return (
           <>
           {user.username !== currentUser.username && (
               <button className="rightBarFollowButton" onClick={handleClick}>
                   {followed ? "Unfollow": "Follow"}
                   {followed ? <Remove />: <Add />}
               
               </button>
           )}
           <h4 className="rightBarTitle"> User Information</h4>
           <div className ="rightBarInfo">
               <div className="rightBarInfoItem">
         <span className ="rightBarInfoKey">City:</span>
         <span className ="rightBarInfoValue">{user.city}</span>
           </div>
           <div className ="rightBarInfo">
         <span className ="rightBarInfoKey">From:</span>
         <span className ="rightBarInfoValue">{user.from}</span>
           </div>
           <div className ="rightBarInfo">
         <span className ="rightBarInfoKey">Realtionship:</span>
         <span className ="rightBarInfoValue">{user.realtionship ===1 ? "Single" : user.realtionship === 1 ? "Married" : "-"}</span>
           </div>
           </div>
           <h4 className="rightBarTitle"> User Friends</h4>
           <div className="rightBarFollowings">
           {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "images/noavatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
               ))}
           </div>

           </>
        )
    }
    return (
        <div className="Rightbar">
            <div className="rightWrapper">
           {user ?    <ProfileRightBar /> : <HomeRightBar />  }
            </div>
        </div>
    );
}
