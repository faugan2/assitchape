import "../styles/search.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import {useState,useEffect,useRef} from "react";

import {useSelector ,useDispatch} from "react-redux";
import {selectCategories,selectCategorie,selectProduits,setProduit} from "../features/counterSlice";
import Produit from "../components/Produit";

const Search=()=>{

    const categories=useSelector(selectCategories);
    const categorie=useSelector(selectCategorie);
    const produits=useSelector(selectProduits);

    const history=useHistory();
    const dispatch=useDispatch();
    const ref=useRef(null);

    const [show_close,set_show_close]=useState(true);
    const [title,set_title]=useState("");
    const [data,set_data]=useState(null);
    const [data_show,set_data_show]=useState([]);
    const [search,set_search]=useState("");

    console.log("la categ est ",categorie);

    useEffect(()=>{
        if( produits==null) return;
       
        set_data(produits);
        set_data_show(produits);

    },[produits]);


    const clear_input=()=>{
        ref.current.value="";
        
    }
    useEffect(()=>{
        if (ref.current==null) return;
        ref.current.addEventListener("focus",is_focused);
        ref.current.addEventListener("blur",is_blur);

        return()=>{
            if(ref.current!=null){
                ref.current.removeEventListener("focus",is_focused);
                ref.current.removeEventListener("blur",is_blur);
            }
        }
    },[ref])

    useEffect(()=>{
        if(data==null) return;
        const res=data.filter((item)=>{
            return item.title.rendered.toLowerCase().indexOf(search.toLowerCase())>=0 || 
            item.content.rendered.toLowerCase().indexOf(search.toLowerCase())>=0 || 
            item.acf.prix.indexOf(search.toLowerCase())>=0 
            ;
        })

        set_data_show(res);
    },[search])

    const is_focused=()=>{
        set_show_close(true)
    }
    const is_blur=()=>{
        set_show_close(false);
    }

    const produit_clicked=(id)=>{
        dispatch(setProduit(id))
        history.push("details-produit");
    }
    return(
        <div className="search">
            <div className="top">
                <button onClick={e=>{
                    history.goBack();
                }}>
                    <ArrowBackIcon />
                </button>
                <div>
                    <input type="text" 
                    
                    autoFocus  ref={ref} value={search} onChange={e=>set_search(e.target.value)} />
                    <button onClick={clear_input}>
                        {search!="" && <CloseIcon style={{fontSize:"1.2rem"}}/>}
                    </button>
                </div>
            </div>
            <div className="content">
            {
                    data_show?.map((item,i)=>{
                        if(item.acf.groupe==114){
                            return(
                                <Produit key={i} produit={item} click={produit_clicked.bind(this,item.id)} promotion={true}/>
                            )
                        }
                        return(
                            <Produit key={i} produit={item} click={produit_clicked.bind(this,item.id)} />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Search;