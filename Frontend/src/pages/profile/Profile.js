import "./profile.css";

import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import Feed from "../../components/feeds/Feed";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <LeftBar />
        <div className="profile-right">
          <div className="profile-rightTop">
            <div className="profileCover">
              <img
                className="profileCoverImage"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImage"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/noavatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profile-rightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
