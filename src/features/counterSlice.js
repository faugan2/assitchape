import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  page:0,
  categories:null,
  categorie:null,
  produits:null,
  produit:null,
  shorts:null,
  openLogin:false,
  user:null,
  messages:null,
  discussWith:null,
};



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  
  reducers: {
   
    
    setPage:(state,action)=>{
      state.page=action.payload;
    },

    setCategories:(state,action)=>{
      state.categories=action.payload;
    },
    setCategorie:(state,action)=>{
      state.categorie=action.payload;
    },

    setProduits:(state,action)=>{
      state.produits=action.payload;
    },
    setProduit:(state,action)=>{
      state.produit=action.payload;
    },
    setShorts:(state,action)=>{
      state.shorts=action.payload;
    },
    setOpenLogin:(state,action)=>{
      state.openLogin=action.payload;
    },
    setUser:(state,action)=>{
      state.user=action.payload;
    },
    setMessages:(state,action)=>{
      state.messages=action.payload;
    },
    setDiscussWith:(state,action)=>{
      state.discussWith=action.payload;
    }



  },
 

});

export const { setPage,setCategories,setCategorie,setProduits,setProduit,setShorts,setOpenLogin,
  setUser,
setMessages,
setDiscussWith
} = counterSlice.actions;

export const selectPage=(state)=>state.counter.page;
export const selectCategories=(state)=>state.counter.categories;
export const selectCategorie=(state)=>state.counter.categorie;
export const selectProduits=(state)=>state.counter.produits;
export const selectProduit=(state)=>state.counter.produit;
export const selectShorts=(state)=>state.counter.shorts;
export const selectOpenLogin=(state)=>state.counter.openLogin;
export const selectUser=(state)=>state.counter.user;
export const selectMessages=(state)=>state.counter.messages;
export const selectDiscussWith=(state)=>state.counter.discussWith;

export default counterSlice.reducer;
