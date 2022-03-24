import "../styles/messages_admin.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import NearMeIcon from '@material-ui/icons/NearMe';
import {useState,useEffect,useRef} from "react";
import {admin_email, auth,db} from "../firebase_file";
import {useSelector ,useDispatch} from "react-redux";
import {selectDiscussWith, selectUser,selectMessages} from "../features/counterSlice";
import Bottom from "../components/Bottom";
import Identity from "../components/Identity";
import firebase from "firebase";
import ChatLine from "../components/ChatLine";

const Search=()=>{

    const history=useHistory();
    const btn=useRef(null);
    const user=useSelector(selectUser);
    const with_user=useSelector(selectDiscussWith);
    const messages=useSelector(selectMessages);

    const [message,set_message]=useState("");
    const [color,set_color]=useState("gray");
    const [login,set_login]=useState(true);
    const [open_login,set_open_login]=useState(false);
    const [data,set_data]=useState([]);
    

    const close_login=()=>{
        set_open_login(false);
    }

    

    useEffect(()=>{
        if(messages==null) return;

        const res=messages.filter((item)=>{
            return (item.sender==with_user && item.to==admin_email) || 
            (item.to==with_user && item.sender==admin_email)
        })

        console.log("the resuls are",res);
        set_data(res);
    },[messages])

    useEffect(()=>{
        if(message==""){
            btn.current.classList.remove("can_send");
            set_color("gray");
        }else{
            btn.current.classList.add("can_send");
            set_color("white");
        }
    },[message]);

    useEffect(()=>{
        if(user==null){
            set_login(false);
        }else{
            set_login(true);
        }
    },[user])

    const send=(e)=>{
        if(message=="") return;
        const info={
            message,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            sender:user?.email,
            to:with_user
        }

        const btn=e.target;
        btn.disabled=true;
       db.collection("messages").add(info).then(()=>{
            set_message("");
            btn.disabled=false;
       }).catch((err)=>{
            btn.disabled=false;
         alert(err.message);
       })
    }


    return(
        <div className="messages">
            <div className="top">
                <button onClick={e=>{
                    history.goBack();
                }}>
                    <ArrowBackIcon />
                </button>
                <h2>Discussion avec {with_user?.split("@")[0]}</h2>
            </div>
            <div className="messages_content">
                {data.length==0 && <p className="info">Aucune conversation n'est trouvée</p>}
                {
                    data.map((item)=>{
                        return(
                            <ChatLine key={item.key} line={item} user={user}/>
                        )
                    })
                }
            </div>

            <div className="zone_input">
                <textarea placeholder="Ecrire le message" value={message} onChange={e=>set_message(e.target.value)} />
                <button ref={btn} onClick={send}>
                    <NearMeIcon style={{fontSize:"1.2rem",color:color}}/>
                </button>
            </div>

            {/*
                open_login==false && <Bottom content={<Identity click={close_login} />} />*/
            }

        </div>
    )
}
export default Search;