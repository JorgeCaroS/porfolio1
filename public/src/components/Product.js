import { useState, useEffect } from "react";
import "../CSS/Product.css";

export default function Product({name, url, cantidad, clicked, tallas, images}) {

  function setClicked(){
    clicked(name, url, tallas, images)
    console.log(url)
    console.log(name)
    
  }
    
        
  return (
      
    <div id="Product" className="Product">
       <p className="Description">{name}  </p> 
       <div className="hvr-wobble-to-top-right">
                  <p>Oferta </p>
       </div>
        
        <figure>         
        <img src={url} alt="singleProduct" />
        <button className="hvr-bubble-float-top" onClick={setClicked}> Comprar</button>
        </figure>   
        {<p>Cantidad {cantidad}</p>     }   
    </div>
  );
}
