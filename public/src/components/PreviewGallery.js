import { useState, useEffect } from "react";
import "../CSS/PreviewGallery.css";

export default function PreviewGallery(link) {
        console.log(link)
  return (
      
    <div id="PreviewGallery" className="PreviewGallery">      
        
        <figure>        
        
        <img
          src={link.link}
          className="imagePreviewGallery"          
          width="120px"
        />
        </figure>   
         
    </div>
  );
}
