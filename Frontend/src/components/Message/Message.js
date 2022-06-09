import "./Message.css"

function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="MessageTop">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4sE0FRmE66Oc3qVVQ5dxKgHaE8%26pid%3DApi&f=1" alt="" className="messageTopImg" />
            <p className="messageTopText">Lorem ipsm fuga! Voluptatum veniam aspernatur non omnis velit laborum?</p>
           
            </div>
            <div className="MessageBottom">
                33 min ago
                </div>
        </div>
  )
}

export default Message