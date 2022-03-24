import "../styles/produit.scss";
const Produit=({produit,click,promotion})=>{
    const title=produit.title.rendered;
    const resume=produit.excerpt.rendered;
    const price=produit.acf.prix;
    const categorie=produit.acf.categorie;
    const image=produit.acf.image;
    const content=produit.content.rendered;

    return(
        <div className="produit" onClick={click}>
            <div>
                <img src={image} />
                
            </div>
            <div>
                <h2 className="title">{title}</h2>
                <div dangerouslySetInnerHTML={{__html:resume}}></div>
                <div>
                <h2 className={promotion==true ? "price_old" : "price"}>{price} FCFA</h2>
                {promotion==true && <h2 className="price">{produit.acf.prix_promotionnel} FCFA</h2>} 
                </div>
            </div>
        </div>
    )
}

export default Produit;