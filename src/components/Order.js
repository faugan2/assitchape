import "../styles/order.scss";
import CloseIcon from '@material-ui/icons/Close';
import CallIcon from '@material-ui/icons/Call';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {useState,useEffect} from "react";
import {useSelector ,useDispatch} from "react-redux";
import {selectProduit,selectProduits,selectUser} from "../features/counterSlice";
import firebase from "firebase";
import {admin_email, db} from "../firebase_file";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Order=({click})=>{
    const produit=useSelector(selectProduit);
    const produits=useSelector(selectProduits);
    const user=useSelector(selectUser);

    const [telephone,set_telephone]=useState("");
    const [email,set_email]=useState("");

    const [alerte,set_alerte]=useState("");
    const [sent,set_sent]=useState(false);

    useEffect(()=>{
        if(user==null) return;
        set_telephone(user?.telephone);
        set_email(user?.email);
    },[user])

    const order=(e)=>{
        set_alerte("");
        set_sent(false);
        if(telephone==""){
            set_alerte("Le numéro de téléphone est vide");
            return;
        }
        const res=produits.filter((item)=>{
            return item.id==produit;
        })

        if(res.length==0){
            set_alerte("Aucun produit n'est sélectionné");
            return;
        }

        const info={
            date:firebase.firestore.FieldValue.serverTimestamp(),
            telephone,
            ...res[0]
        }
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";
        db.collection("commandes").add(info).then(()=>{

            const chat_info={
                date:firebase.firestore.FieldValue.serverTimestamp(),
                sender:email,
                to:admin_email,
                message:`
                    Bonjour, je viens de passer ma commande pour le produit
                    ${res[0].title.rendered}
                `
            }

            db.collection("messages").add(chat_info).then(()=>{
                set_alerte("Votre commande est bien enregistrée");
                btn.disabled=false;
                btn.innerHTML="Commandez";
                set_telephone("");
                set_sent(true);
                setTimeout(()=>{
                // click();
                },2000)
            }).catch((err)=>{
                set_alerte(err.message);
                btn.disabled=false;
                btn.innerHTML="Commandez";
            })

            
        }).catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            btn.innerHTML="Commandez";
        })
    }

    return (
        <div className="order">
            <button
                onClick={click}
            >
                <CloseIcon style={{fontSize:"1.2rem",color:"white"}} />
            </button>
            {sent==false && <div className="line">
                <label>Votre téléphone</label>
                <p>
                    Assurez-vous de mettre un numéro de téléphone whatsapp ou un numero sur lequel on peut vous joindre.
                </p>
                <div>
                    <CallIcon style={{fontSize:"1.2rem",color:"var(--sub_black)"}}/>
                    <input type="tel" placeholder="+228 90 00 00 00" value={telephone}
                    onChange={e=>set_telephone(e.target.value)}
                    />
                </div>
            </div>}

            {sent==false && <div className="line">
                <button onClick={order}>Commandez</button>
            </div>}
           {sent==false &&  <p className="alerte">{alerte}</p>}

            {sent==true && 
                <div className="sent">
                    <CheckCircleIcon  style={{fontSize:"3.2rem",color:"green"}}/>
                    <h2>Commande bien enregistrée</h2>
                    <p>
                        Merci pour votre commande. Nous vous contacterons très vite par les moyens suivants: 
                      
                        
                    </p>

                    <div className="moyens">
                        <button>
                            <WhatsAppIcon  style={{fontSize:"1.2rem"}} />
                            WhatsApp
                        </button>

                        <button>
                            <CallIcon  style={{fontSize:"1.2rem"}}/>
                            Appel
                        </button>
                    </div>
                </div>}
        </div>
    )
}
export default Order;