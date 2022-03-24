import "../styles/products.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import {useState,useEffect} from "react";
import {useSelector ,useDispatch} from "react-redux";
import {selectCategories,selectCategorie,selectProduits,setProduit} from "../features/counterSlice";
import Produit from "../components/Produit";

const Search=()=>{
    const categories=useSelector(selectCategories);
    const categorie=useSelector(selectCategorie);
    const produits=useSelector(selectProduits);

    const history=useHistory();
    const dispatch=useDispatch();

    const [title,set_title]=useState("");
    const [data,set_data]=useState(null);

    console.log("la categ est ",categorie);

    useEffect(()=>{
        if(categories==null || categorie==null || produits==null) return;
        const res=categories.filter((item)=>{
            return item.id==categorie;
        })
        if(res.length>0){
            set_title(res[0].title.rendered);
        }

        const res2=produits.filter((item)=>{
            return item.acf.categorie ==categorie;
        })
        set_data(res2);

    },[categories,categorie,produits]);

    const produit_clicked=(id)=>{
        dispatch(setProduit(id));
        history.push("details-produit");
    }
    return(
        <div className="products">
            <div className="top">
                <button onClick={e=>{
                    history.goBack();
                }}>
                    <ArrowBackIcon />
                </button>
                <h2>{title}</h2>
            </div>
            <div className="content">
            {data?.length==0 && <p style={{textAlign:"center",fontSize:"0.8rem",marginTop:"1rem"}}>
               Aucun produit n'est trouvé</p>
            }
                {
                    data?.map((item,i)=>{
                        return(
                            <Produit key={i} produit={item} click={produit_clicked.bind(this,item.id)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Search;