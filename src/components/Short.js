import "../styles/short.scss";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
const Short=({short,click})=>{
    return(
        <div className="short" onClick={click}>
            <img src={short?.acf.image} />
            <h2>{short?.title.rendered}</h2>

            <button>
                <PlayCircleFilledIcon style={{fontSize:"2rem",color:"goldenrod"}}/>
            </button>
        </div>
    )
}
export default Short;