import "../styles/floating_button_produit.scss";
import ShareIcon from '@material-ui/icons/Share';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
const FloatingButtonProduit=({produit,click_order})=>{
    console.log(produit);

    

      const share_product=async ()=>{
        const shareData = {
            title: produit?.title.rendered,
            text: document.querySelector("#details").textContent,
            url: 'https://assitchape.com'
          }
        try {
            await navigator.share(shareData)
            //resultPara.textContent = 'MDN shared successfully'
          } catch(err) {
            //resultPara.textContent = 'Error: ' + err
          }
      }

      const go_to_whatsapp=()=>{
    
        window.location.href=`https://wa.me/22891044512?text=Bonjour,%0aJe suis interessé par le produit *${produit?.title.rendered.trim()}*.%0aJ'aimerai qu'on en discute.%0aMerci.`;
       
      }
    return(
        <div className="floating_button_produit">
            <div dangerouslySetInnerHTML={{__html:produit?.content.rendered}} id="details" style={{display:"none"}}></div>
            
            <button 
             className="shopping_btn"
             onClick={click_order}
            >
                <ShoppingCartIcon />
            </button>
            <button  onClick={go_to_whatsapp} className="chat_btn">
                <WhatsAppIcon />
            </button>

            <button onClick={share_product} className="share_btn">
                <ShareIcon />
            </button>
           
           
        </div>
    )
}

export default FloatingButtonProduit;