import "../styles/footer.scss";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HistoryIcon from '@material-ui/icons/History';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import {useState,useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { setPage,selectPage } from "../features/counterSlice";
const Footer=()=>{
    const dispatch=useDispatch();

    const p=useSelector(selectPage);
    const [index,set_index]=useState(0);
    
    useEffect(()=>{
        set_index(p);
    },[p]);
    useEffect(()=>{
        const btns=document.querySelectorAll(".footer>button");
        for(var i=0; i<btns.length; i++){
            btns[i].classList.remove("active");
        }
        btns[index].classList.add("active");

    },[index]);
    return(
        <div className="footer">
            <button onClick={e=>dispatch(setPage(0))}>
                <TrendingUpIcon />
                Phares</button>
            <button onClick={e=>dispatch(setPage(1))}>
                <HistoryIcon />
                Populaires</button>
            <button onClick={e=>dispatch(setPage(2))}>
                <LocalCafeIcon />
                Promotions</button>
        </div>
    );
}

export default Footer;