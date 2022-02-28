import "./Online.css"

export default function Online({user}) {
         const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="rightBarFriend">
                      <div className="rightBarImgProfImgConatiner">
                          <img src={PF+user.profilePicture} alt="" className="rightbarProfImg" />
                     <span className="rightBarOnline"></span>
                      </div>
                      <span className="rightBarUsername">{user.username}</span>
                  </li>
    );
}
