import "../styles/splash.scss";
import logo from "../components/img/logo2.png";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEfect, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setCategories,setProduits, setShorts,setMessages,setUser } from "../features/counterSlice";
import {db,auth} from "../firebase_file";

import 'prevent-pull-refresh';
const Splash=()=>{
  const history=useHistory();
  const dispatch=useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      
      if(user!=null){
        const email=user?.email;
        db.collection("users")
        .where("email","==",email)
        .get()
        .then((snap)=>{
          if(snap.docs.length>0){
            const info=snap.docs[0].data();
            dispatch(setUser(info));
          }
        })
      }
    })
  },[auth])

  useEffect(()=>{
      (async ()=>{
        await load_categories();
        await load_produits();
        await load_shorts();
        await load_messages();
        //await load_user();

        setTimeout(()=>{
          history.replace("/home");
        },2000)
        
      })()
      
  },[])

  const load_categories=async ()=>{
    const res=await fetch("https://assitchape.com/admin/wp-json/wp/v2/categories");
    const data=await res.json();
    dispatch(setCategories(data));
  }

  const load_produits=async ()=>{
    const res=await fetch("https://assitchape.com/admin/wp-json/wp/v2/produits");
    const data=await res.json();
    dispatch(setProduits(data));
  }

  const load_shorts=async ()=>{
    const res=await fetch("https://assitchape.com/admin/wp-json/wp/v2/shorts");
    const data=await res.json();
    dispatch(setShorts(data));
  }

  const load_messages=async ()=>{
    db.collection("messages").orderBy("date","asc").onSnapshot((snap)=>{
      const d=[];
      snap.docs.map((doc)=>{
        const key=doc.id;
        const data=doc.data();
        data.key=key;
        d.push(data);
      })
      dispatch(setMessages(d))
    })
  }

  const load_user=async ()=>{
    auth.onAuthStateChanged((user)=>{
      console.log("oh the info is ",user);
    })
  }
    return(
        <div className="splash">
           <img src={logo}/>
           <h2>Assitchape.com</h2>
           <CircularProgress  style={{color:"var(--sub_black)"}} size={15} />

           <div className="splash_footer">
              <p>from</p>
              <p>Assitchape Inc.</p>
           </div>
        </div>
    )
}

export default Splash;