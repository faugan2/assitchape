import "../styles/header.scss";
import SearchIcon from '@material-ui/icons/Search';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import categorie from "./img/categorie.png";
import categorie2 from "./img/ordinateur.png";
import categorie3 from "./img/categorie3.png";
import logo from "./img/logo.jpeg";
import {useHistory} from "react-router-dom";
import {useSelector ,useDispatch} from "react-redux";
import {selectCategories,setCategorie,setOpenLogin,selectUser,setUser} from "../features/counterSlice";
import {useState,useEffect} from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Bottom from "./Bottom";
import Identity from "./Identity";

import {auth} from "../firebase_file";

const Header=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const cat=useSelector(selectCategories);
    const user=useSelector(selectUser);

    const [categories,set_categories]=useState(null);
    const [open_login,set_open_login]=useState(false);
    const [login,set_login]=useState(false);

    const close_login=()=>{
        set_open_login(false);
    }
    const reload_app=()=>{
        history.replace("/");
    }
    const go_to_search=()=>{
        history.push("/search");
    }

    useEffect(()=>{
        if(cat==null){
            history.replace("/");
            return;
        }
        set_categories(cat);
        
    },[cat]);

    useEffect(()=>{
        dispatch(setOpenLogin(open_login));
    },[open_login])

    useEffect(()=>{
        if(user==null){
            set_login(false);
        }else{
            set_login(true);
        }
    },[user])

    const see_all_products=(id)=>{
        dispatch(setCategorie(id));
        history.push("/products",{id});
    }
    return(
        <div className="header">
            <div>
               <img src={logo} onClick={reload_app} />
                <button onClick={go_to_search}>
                    <SearchIcon style={{fontSize:"1.2rem"}} />
                   Rechercher un produit</button>
                <div>
                    {login==false && <button onClick={e=>set_open_login(true)}>
                        <PermIdentityIcon style={{fontSize:"1.2rem"}} />
                    </button>}

                    {login==true && <button onClick={e=>{
                        auth.signOut();
                        dispatch(setUser(null));
                    }}>
                        <PowerSettingsNewIcon style={{fontSize:"1.2rem",color:"indianred"}} />
                    </button>}
                </div>
            </div>
            <div>
                <ScrollMenu>
                    {
                        categories?.map((item,i)=>{
                            const img=item.acf.image;
                            const title=item.title.rendered;
                            return(
                                <button key={i} className="categorie" onClick={see_all_products.bind(this,item.id)}>
                                <img src={img} />
                                <p>{title}</p>
                                </button>
                            )
                        })
                    }
                  
                   
                </ScrollMenu>
            </div>

           {open_login==true && <Bottom content={<Identity click={close_login}/>} />}
        </div>
    );
}

export default Header;