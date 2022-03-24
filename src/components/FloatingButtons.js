import "../styles/floating_buttons.scss";
import ShareIcon from '@material-ui/icons/Share';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import {useHistory} from "react-router-dom";
import img from "./img/whatsapp.png";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {useSelector ,useDispatch} from "react-redux";
import {selectUser} from "../features/counterSlice";
import { admin_email } from "../firebase_file";

const FloatingButtons=()=>{
    const history=useHistory();
    const user=useSelector(selectUser);

    const shareData = {
        title: 'Assitchape.com',
        text: 'Achetez tout sur Assitchape.com',
        url: 'https://assitchape.com'
      }

      const share_app=async ()=>{
        try {
            await navigator.share(shareData)
            //resultPara.textContent = 'MDN shared successfully'
          } catch(err) {
            //resultPara.textContent = 'Error: ' + err
          }
      }

      
    return(
        <div className="floating_buttons">
            <button style={{
                backgroundColor:"black"
            }}
            onClick={share_app}
            >
                <ShareIcon style={{fontSize:"1.2rem"}}/>
            </button>
            
            <button onClick={e=>{
                if(user?.email==admin_email){
                    history.push("/contacts");
                }else{
                    history.push("/messages");
                }
                
            }}
            style={{
                backgroundColor:"green"
            }}
            >
                <QuestionAnswerIcon style={{fontSize:"1.2rem"}}/>
            </button>
            <button onClick={e=>{
                history.push("/shorts")
            }}
            style={{
                backgroundColor:"indianred"
            }}
            >
                <VideoLibraryIcon style={{fontSize:"1.2rem"}}/>
            </button>
        </div>
    );
}
export default FloatingButtons; 