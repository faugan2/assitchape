import "../styles/identity.scss";
import CloseIcon from '@material-ui/icons/Close';
import CallIcon from '@material-ui/icons/Call';
import {auth,db,admin_email,admin_telephone} from "../firebase_file";
import firebase from "firebase";
import {useState,useEffect} from "react";
import {selectUser,setUser} from "../features/counterSlice";
import {useSelector ,useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";



const Identity=({click,message})=>{
    const user=useSelector(selectUser);

    const dispatch=useDispatch();
    const history=useHistory();

    const [telephone,set_telephone]=useState("");
    const [alerte,set_alerte]=useState("");

    const continuer=(e)=>{
        set_alerte("");
        if(telephone==""){
            set_alerte("Le numéro de téléphone est vide");
            return;
        }
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        const email=`${telephone}@gmail.com`;
        const info={email,telephone,date:firebase.firestore.FieldValue.serverTimestamp()}
        
        db.collection("users").where("email","==",email).get().then((snap)=>{
            btn.disabled=false;
            btn.innerHTML="Continuez";
            if(snap.docs.length==0){
                auth.createUserWithEmailAndPassword(email,telephone).then((user)=>{
                    db.collection("users").add(info).then(()=>{
                        dispatch(setUser(info));
                        click();
                        if(message==true){
                            if(email==admin_email){
                                history.push("/contacts")
                            }else{
                                history.push("/messages");
                            }
                        }
                    }).catch(async (err)=>{
                        await auth.signOut();
                        btn.disabled=false;
                        btn.innerHTML="Continuez";
                        set_alerte(err.message);
                    })
                }).catch((err)=>{
                    btn.disabled=false;
                    btn.innerHTML="Continuez";
                    set_alerte(err.message);
                })
            }else{
                //already created
                const data=snap.docs[0].data();
                const email_db=data.email;
                const telephone_db=data.telephone;
                const date_db=new Date(data.date?.seconds*1000);

                const info_db={
                    email:email_db,
                    telephone:telephone_db,
                    date:date_db
                }
                dispatch(setUser(info_db));
                click();
                if(message==true){
                    if(email_db==admin_email){
                        history.replace("/contacts")
                    }else{
                        history.replace("/messages");
                    }
                }
            }
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Continuez";
            set_alerte(err.message);
        })

    }
    return(
        <div className="identity">
            <button onClick={click}>
                <CloseIcon style={{fontSize:"1.2rem",color:"white"}}/>
            </button>
            <h2>Identifiez-vous</h2>
            <div className="line">
                <label>Téléphone</label>
                <div>
                    <CallIcon  style={{fontSize:"1.2rem",color:"var(--sub_black)"}} />
                    <input type="tel" placeholder="228 00 00 00 00" autoFocus 
                    value={telephone}
                    onChange={e=>set_telephone(e.target.value)}
                    />
                </div>
                <p>Saisissez un numéro de téléphone sur lequel nous pouvons vous joindre(Appel ou Whatsapp)</p>
            </div>
            <div className="line">
                <button onClick={continuer}>Continuez</button>
            </div>

            <p className="alerte">
                {alerte}
            </p>

        </div>
    )
}

export default Identity