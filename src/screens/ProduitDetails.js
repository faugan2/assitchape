import "../styles/produit_details.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch,useSelector} from "react-redux";
import {selectProduits,selectProduit} from "../features/counterSlice";
import {useState,useEffect} from "react";
import FloatingButtonProduit from "../components/FloatingButtonProduit";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import Bottom from "../components/Bottom";
import Image from "../components/Image";
import Order from "../components/Order";

const Search=()=>{
    const produits=useSelector(selectProduits);
    const produit=useSelector(selectProduit);

    const history=useHistory();

    const [data,set_data]=useState(null);
    const [image,set_image]=useState(null);
    const [gallerie,set_gallerie]=useState(null);
    const [open_image,set_open_image]=useState(false);
    const [open_order,set_open_order]=useState(false);


    useEffect(()=>{
        if(produit==null || produits==null) return;
        const res=produits.filter((item)=>{
            return item.id==produit;
        })
        if(res.length>0){
            set_data(res[0]);
        }
    },[produit,produits]);

    const open_image_modal=(item,gallerie)=>{
        
        set_open_image(true);
        set_image(item);
        set_gallerie(gallerie);
    }

    const close_image_modal=()=>{
        set_open_image(false);
        set_image(null);
        set_gallerie(null);
    }
    const close_order=()=>{
        set_open_order(false);
    }

    const open_modal_order=()=>{
        set_open_order(true);
    }
    return(
        <div className="produit_details">
            <div className="top">
                <button onClick={e=>{
                    history.goBack();
                }}>
                    <ArrowBackIcon />
                </button>
                <h2>Details du produit</h2>
            </div>
            <div className="content">
               <h2 className="title">{data?.title.rendered}</h2>
               <h2 className={data?.acf.groupe=="114" ? "price_old":"price"}>{data?.acf.prix} FCFA</h2>
               {data?.acf.groupe=="114" && <h2 className="price_promotion">{data?.acf.prix_promotionnel}</h2>}
               <div className="galery">
                   
                   <ScrollMenu>
                    <img src={data?.acf.image} onClick={open_image_modal.bind(this,data?.acf.image,data?.acf.gallerie)}/>
                    {
                        data?.acf.gallerie?.map((item)=>{
                            return(
                                <img src={item.thumbnail_image_url} key={item.id}  
                                onClick={open_image_modal.bind(this,item.full_image_url,data?.acf.gallerie)}/>
                            )
                        })
                    }
                   </ScrollMenu>
               </div>
               <div dangerouslySetInnerHTML={{__html:data?.content.rendered}} className="details"></div>
            </div>

            {(open_image==false && open_order==false)&& <FloatingButtonProduit produit={data} click_order={open_modal_order}/>}
            {open_image==true && <Bottom content={<Image  click={close_image_modal} 
            image={image} gallerie={gallerie} />} />}
            {open_order==true && <Bottom content={<Order click={close_order}/>} />}
        </div>
    )
}
export default Search;