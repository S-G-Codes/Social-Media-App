import "./LeftBarFriend.css";


export default function LeftBarFriend({user}) {
        const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="LeftBarFriend">
        <img className="LeftBarFriendImg"
        //  src={PF+user.profilePicture}
        src="../images/girlphoto.png"
          alt="FrndImg"  />
        <span className="LeftBarFriendName">
            {/* {user.username} */}
             Friend's
            </span>
    </li>
    );
}
