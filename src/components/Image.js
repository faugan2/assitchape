import "../styles/image.scss";
import CloseIcon from '@material-ui/icons/Close';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
const Image=({click,image,gallerie})=>{
    const res=gallerie.filter((item)=>{
        return item.full_image_url!=image;
    })
    
    return(
        <div className="image">
            <ScrollMenu>
                <img src={image} 
                style={{
                    objectFit:"fill",
                    width:"95vw",
                    height:"60vh",
                }}
                />
                {
                    res.map((url,i)=>{
                        
                        return <img src={url.full_image_url} key={i} style={{
                            objectFit:"fill",
                            width:"95vw",
                            height:"60vh",
                        }}/>
                    })
                }
            </ScrollMenu>
            
            <button onClick={click}>
                <CloseIcon style={{fontSize:"1.2rem",color:"white"}} />
            </button>
        </div>
    )
}

export default Image;