import "../styles/404.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";
const Page404=()=>{
    const history=useHistory();

    return(
        <div className="page_404">
            <div className="top">
            <button onClick={e=>{
                    history.replace("/");
                }}>
                    <ArrowBackIcon />
                </button>
                <h2>Page Non Trouvée</h2>
            </div>
            <div className="content">
                <h1>404</h1>
                <p>Page Non trouvé</p>
            </div>
        </div>
    )
}

export default Page404;