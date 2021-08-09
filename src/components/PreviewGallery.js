import { useState, useEffect } from "react";
//import "../index.css";

export default function PreviewGallery(link) {
        console.log(link)
  return (
      
    <div id="PreviewGallery" className="PreviewGallery">      
        
        <figure>        
        
        <img
          alt="imagePreviewGallery"
          src={link.link}
          className="imagePreviewGallery"          
          width="120px"
          
        />
        </figure>   
         
    </div>
  );
}
