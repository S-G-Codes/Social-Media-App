import "./Share.css"
import {PermMedia, Label, Room,EmojiEmotions, Cancel } from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Share() {
const {user} = useContext(AuthContext);
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const desc = useRef();
const [file,setFile] = useState(null);


const submitHandler =  async (e)=>{
    e.preventDefault();
    const newPost = {
        userId: user._id,
        desc: desc.current.value,
    }
    if(file){
        const data = new FormData();
        // ḍate.now will add a current date  + whatever file name is as a file name to store it into db
        const fileName = Date.now() + file.name;
        data.append("name",fileName);
        data.append("file",file);
        newPost.img = fileName;
        console.log(newPost);
        try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          await axios.post("/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="ShareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "noavatar.png"} alt="" className="shareProfileimg" />
               <input placeholder = {"Share your thoughts " + user.username + "?"} className="shareInput" ref={desc} />
               </div>
            
             <hr className="ShareHr"/>
            {file  && (
                <div className="shareImgContainer">
                    {/* URL.createObjectURL(file) this allows you to pre-view the file we are gonna uploading */}
                    <img src={URL.createObjectURL(file)} alt="" className="shareimg" />
                <Cancel className="shareCancelling" onClick={() => setFile(null)} />
                </div>
            )}


              <form className="ShareBottom" onSubmit={submitHandler}>
                 <div className="shareOptions">
                     <label htmlFor="file" className="shareOption">
                         <PermMedia htmlColor="tomato" className="shareIcon"/>
                         <span className="shareOptionText">Photo or Video</span>
                         <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
                     </label>
                     <div  className="shareOption">
                         <Label htmlColor="blue" className="shareIcon"/>
                         <span className="shareOptionText">Tag</span>
                     </div>
                     <div className="shareOption">
                         <Room htmlColor="green" className="shareIcon"/>
                         <span className="shareOptionText">Location</span>
                     </div>
                     <div className="shareOption">
                         <EmojiEmotions  htmlColor="goldenrod" className="shareIcon"/>
                         <span className="shareOptionText">Feelings</span>
                     </div>
                 </div>
                 <button className="sharebtn" type="submit">
                     Share
                 </button>
              </form>
              
            
        </div>
        </div>

    )
}
