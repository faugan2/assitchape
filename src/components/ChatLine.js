import "../styles/chat_line.scss";
import {useSelector ,useDispatch} from "react-redux";
import {selectUser} from "../features/counterSlice";
import logo from "./img/logo2.png";

const moment=require("moment-timezone");

const ChatLine=({line,user})=>{
    console.log(line.date);
    let cl;
    if(line.sender==user.email){
        cl="sender";
    }else{
        cl="receiver";
    }
    if(cl=="sender"){
        return(
            <div className={`chat_line ${cl}`}>
                <div>
                    <p>Moi:</p>
                    <p>{line?.message}</p>
                </div>
                <div>
                    <p>
                        {moment(line?.date?.seconds*1000).format("lll")}
                    </p>
                </div>
            </div>
        )
    }else{
        return(
            <div className={`chat_line ${cl}`}>
                <div>
                    <div>
                        <img src={logo} />
                        <p>Assitchape.com:</p>
                    </div>
                    <p dangerouslySetInnerHTML={{__html:line?.message}}></p>
                </div>
                <div>
                    <p>
                        {moment(line?.date?.seconds*1000).format("lll")}
                    </p>
                </div>
            </div>
        )
    }
    
}
export default ChatLine;