import { useState, useEffect } from "react";
import "../CSS/Preview.css";
import { useHistory } from "react-router-dom";
import PreviewGallery from "./PreviewGallery";
import Fade from "react-reveal/Fade";

export default function Preview() {
  
  const [tallas, setTallas] = useState();
  const [images, setImages] = useState([]);
  const history = useHistory();
  const currentItem = history.location.state.url;
 

  useEffect(async () => {
    const images1 = history.location.state.images;
    const tallas1 = await history.location.state.tallas;
    setTallas(tallas1);
    setImages(images1);
  }, []);


/////////////


/////////////////////////////////
  return (
    //<Fade up>
    <div id="PreviewMain" className="PreviewMain">
       
      <div className="previewHeader">
        <p>Preview </p>
      </div>

      <div id="PreviewImage" className="Previewimage">
        <figure>
          <img className="previewMainImage" src={currentItem} alt="singleProduct" />
          <button className="hvr-bubble-float-top"> Comprar</button>
        </figure>
      </div>

      <div id="PreviewGallery" className="PreviewGallery">
        {images.map((image) => (
          <PreviewGallery key={image} link={image} />
        ))}
      </div>
     
      
    </div>
   // </Fade>
  );
}
