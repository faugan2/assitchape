import "../styles/produits_promotions.scss";
import {useSelector ,useDispatch} from "react-redux";
import {selectProduits,selectCategories,setProduit} from "../features/counterSlice";
import {useState,useEffect} from "react";
import Produit from "../components/Produit";
import {useHistory} from "react-router-dom";
const ProduitsPhares=()=>{
    const produits=useSelector(selectProduits);
    const categories=useSelector(selectCategories);

    const dispatch=useDispatch();
    const history=useHistory();

    const [data,set_data]=useState(null);
    useEffect(()=>{
        if(produits==null) return;
        const res=produits.filter((item)=>{
            return item.acf.groupe==114;
        })
        set_data(res);
    },[produits,categories])

    const produit_clicked=(id)=>{
        dispatch(setProduit(id));
        history.push("details-produit");
    }
    
    return(
        <div className="produits_promotions">
           {data?.length==0 && <p style={{textAlign:"center",fontSize:"0.8rem",marginTop:"1rem"}}>
               Aucun produit n'est trouvé</p>
            }
           {
            data?.map((item,i)=>{
                return <Produit key={i} produit={item} click={produit_clicked.bind(this,item.id)} promotion={true}/>
            })
           }
           
        </div>
    );
}

export default ProduitsPhares;