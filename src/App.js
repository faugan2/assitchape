import React from 'react';
import logo from "./components/img/logo.jpeg";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Messages from "./screens/Messages";
import Shorts from "./screens/Shorts";
import Products from "./screens/Products";
import ProduitDetails from "./screens/ProduitDetails";
import Page404 from "./screens/404";
import Contacts from "./screens/Contacts";
import MessagesAdmin from "./screens/MessagesAdmin";

function App() {
  return (

    <Router>
    <Switch>
      <Route path="/" exact>
        <Splash />
      </Route>

      <Route path="/home" exact>
        <Home />
      </Route>

      <Route path="/search" exact>
        <Search />
      </Route>

      <Route path="/messages" exact>
        <Messages />
      </Route>

      <Route path="/shorts" exact>
        <Shorts />
      </Route>
      <Route path="/products" exact>
        <Products />
      </Route>

      <Route path="/details-produit" exact>
        <ProduitDetails />
      </Route>

      <Route path="/contacts" exact>
        <Contacts />
      </Route>

      <Route path="/messages-admin" exact>
        <MessagesAdmin />
      </Route>
      

      <Route path="*">
        <Page404 />
      </Route>

    </Switch>
    </Router>
    
  );
}

export default App;
