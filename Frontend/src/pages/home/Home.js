import "./Home.css"
import LeftBar from '../../components/leftBar/LeftBar'
import RightBar from '../../components/rightBar/RightBar'
import Feed from '../../components/feeds/Feed'
import Topbar from '../../components/topbar/Topbar'

export default function Home() {
    return (
        
            <>
<Topbar/>
<div className="homeContainer">

<LeftBar/>
<Feed />
<RightBar/>
</div>
        </>
    );
}

 
