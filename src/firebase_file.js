import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const admin_telephone=process.env.REACT_APP_admin_telephone;
const admin_email=process.env.REACT_APP_admin_email;

const firebaseConfig = {
  apiKey: "AIzaSyDUEPYdyq9Q1EH12Jsam653c3nqd7M3-ME",
  authDomain: "joel-store.firebaseapp.com",
  projectId: "joel-store",
  storageBucket: "joel-store.appspot.com",
  messagingSenderId: "788106806590",
  appId: "1:788106806590:web:82943554fde29403a5d86f"
};




let app;
if(firebase.apps.length==0){
  app=firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app();
}


const auth=app.auth();
const db=app.firestore();
const storage=app.storage();




export {auth,db,storage,admin_email,admin_telephone};





