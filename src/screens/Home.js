import "../styles/home.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";    
import SwipeableViews from 'react-swipeable-views';
import {useState,useEfect, useEffect} from "react";
import ProduitsPhares from "../components/ProduitsPhares";
import ProduitsPopulaires from "../components/ProduitsPopulaires";
import ProduitsPromotions from "../components/ProduitsPromotions";
import { useSelector ,useDispatch} from "react-redux";
import { setPage,selectPage,selectOpenLogin } from "../features/counterSlice";
const Home=()=>{

    const p=useSelector(selectPage);
    const login=useSelector(selectOpenLogin);

    const dispatch=useDispatch();

    const [page,set_page]=useState(0);
    
    const tab_changed=(e)=>{
        dispatch(setPage(e));
    }

    useEffect(()=>{
        set_page(p);
    },[p])
    return(
        <div className="home">
            <Header />
            {login==false && <Footer />}
            {login==false && <FloatingButtons />}
            <div className="content">
                <SwipeableViews enableMouseEvents={true} index={page} onChangeIndex={tab_changed}
                style={{color:"white"}}
                > 
                    {page==0 &&  <ProduitsPhares />}
                    {page==1 && <ProduitsPopulaires />}
                    {page==2 &&<ProduitsPromotions />}
                </SwipeableViews>
            </div>
            
        </div>
    )
}

export default Home;