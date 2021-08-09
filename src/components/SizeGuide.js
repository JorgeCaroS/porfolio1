import GuiaTallasInferior from "../images/GuiaTallasInferior.jpg";
import GuiaTallasSuperior from "../images/GuiaTallasSuperior.jpg";
import { useState, useContext } from "react";
import {MyContext} from "../context/MyContext";

export default function SizeGuide() {

  const { sizeGuideClassName, setSizeGuideClassName } = useContext(MyContext);
  const {productSelected, setProductSelected} = useContext(MyContext);

  function handleClick(){
    setSizeGuideClassName("hidden");
  }

  


    return (
      <div>        
          <div className={sizeGuideClassName}>
            <button onClick={handleClick} className="close-guide">Cerrar</button>
            { <img src={productSelected.article === "bottom" ? GuiaTallasInferior : GuiaTallasSuperior}/>}
          </div>
      </div>
    );
  }
  