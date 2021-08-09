import React from "react";
import logo from "../logo.svg";
import "../App.css";
import "../index.css";
import { useState, useEffect } from "react";
import Product from "./Product";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Preview from "./Preview";



export default function App() {
  
  const  [previewURL, setPurl] = useState();

    

  return (    

    <BrowserRouter>
    <React.Fragment>

      <Route exact path="/">      
        <Home />        
      </Route>

      <Route exact path="/Home/:id">
        <Preview />
      </Route>
    </React.Fragment>
  </BrowserRouter>
  
   
  );
}


