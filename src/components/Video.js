import "../styles/video.scss";
import CloseIcon from '@material-ui/icons/Close';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
const Video=({click,video,videos})=>{
    const res=videos.filter((item)=>{
        return item.acf.image!=video?.acf.image && item.acf.video!=video?.acf.video;
    })
    
    console.log(res);
    const update=(context,second)=>{
        console.log(context.getNextItem());
    }
    return(
        <div className="video">
            
            <button onClick={click}>
                <CloseIcon style={{fontSize:"1.2rem",color:"white"}}/>
            </button>
            <video controls autoPlay poster={video?.acf.image} src={video?.acf.video} loop></video>
            {/*<ScrollMenu onWheel={update}>
                <video controls autoPlay poster={video?.acf.image} src={video?.acf.video} loop style={{
                    width:"95vw",
                    height:"60vh",
                    objectFit:"fill"
                }}></video>
                {
                    res.map((video,i)=>{
                        return(
                            <video key={i} controls  poster={video?.acf.image} src={video?.acf.video} loop style={{
                                width:"95vw",
                                height:"60vh",
                                objectFit:"fill"
                            }}></video>
                        )
                    })
                }
            </ScrollMenu>*/}
            
        </div>
    )
}

export default Video;