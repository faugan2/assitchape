import "../styles/contacts.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import {useState,useEffect} from "react";
import {useSelector ,useDispatch} from "react-redux";
import {selectShorts,selectMessages, setDiscussWith} from "../features/counterSlice";
import Short from "../components/Short";
import Bottom from "../components/Bottom";
import Video from "../components/Video";
import {admin_email, admin_telephone, auth,db} from "../firebase_file";


const moment=require("moment-timezone");
const Search=()=>{

    const history=useHistory();
    const dispatch=useDispatch();

    const shorts=useSelector(selectShorts);
    const messages=useSelector(selectMessages);

    const [emails,set_emails]=useState([]);
    const [data,set_data]=useState([]);

    useEffect(()=>{
        if(messages==null) return;
        const d=[];
        messages.map((message)=>{
            let email=message.sender;
            if(email==admin_email){
                email=message.to;
            }
            if(d.indexOf(email)<0){
                d.push(email);
            }
        })
        set_emails(d);
        
    },[messages]);

    useEffect(()=>{
        if(emails.length==0) return;
        
        const res=emails.map((email,i)=>{

            const res2=messages.filter((item)=>{
                return item.sender==email || item.to==email;
            })
            return {email,last_message:res2[res2.length-1]};
        })

        set_data(res);
    },[emails])

    const discuss_with=(email)=>{
        dispatch(setDiscussWith(email))
        history.push("/messages-admin");
    }
    

    return(
        <div className="messages">
            <div className="top">
                <button onClick={e=>{
                    history.goBack();
                }}>
                    <ArrowBackIcon />
                </button>
                <h2>Les contacts</h2>
            </div>
            <div className="content">
                {data.length==0 && <p className="info">Aucun contact n'est trouvé</p>}
                {
                    data.map(({email,last_message},i)=>{
                        const phone=email.split("@")[0];
                        if(phone==admin_telephone) return null;
                        return(
                            <div key={i} className="contact" onClick={discuss_with.bind(this,email)}>
                                <p>{phone}</p>
                                <p>{last_message.message}</p>
                                <p>{moment(last_message.date?.seconds*1000).format("lll")}</p>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}
export default Search;