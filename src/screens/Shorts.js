import "../styles/shorts.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import {useState,useEffect} from "react";
import {useSelector ,useDispatch} from "react-redux";
import {selectShorts} from "../features/counterSlice";
import Short from "../components/Short";
import Bottom from "../components/Bottom";
import Video from "../components/Video";
const Search=()=>{

    const history=useHistory();
    const shorts=useSelector(selectShorts);

    const [data,set_data]=useState(null);
    const [open,set_open]=useState(false);
    const [video,set_video]=useState(null);


    useEffect(()=>{
        if(shorts==null){
            history.replace("/");
            return;
        }
        set_data(shorts);

    },[shorts]);

    const close_open=()=>{
        set_open(false);
    }
    const open_modal=(item)=>{
        set_open(true);
        set_video(item);
    }

    return(
        <div className="messages">
            <div className="top">
                <button onClick={e=>{
                    history.goBack();
                }}>
                    <ArrowBackIcon />
                </button>
                <h2>Shorts videos</h2>
            </div>
            <div className="content">
                {data?.length==0 && <p style={{fontSize:"0.8rem",textAlign:"center",marginTop:"1rem"}}>
                    Aucune vidéo n'est publiée
                </p>}

                {data?.length>0 && 
                    <div className="shorts_container">
                        {
                            data?.map((item,i)=>{
                                return(
                                    <Short key={i} short={item} click={open_modal.bind(this,item)}/>
                                );
                            })
                        }
                    </div>
                }
            </div>

            {open==true && <Bottom content={<Video click={close_open} video={video} videos={data}/>} />}
        </div>
    )
}
export default Search;