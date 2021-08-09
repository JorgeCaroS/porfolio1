import React from "react";
import { useState } from "react";




export default function Crear() {

  const [archivo, setArchivo] = useState([]);
  const axios = require("axios");
  let archivoRef = React.createRef();
  let nameRef = React.createRef();
  //let descriptionRef = React.createRef();
  let refRef = React.createRef();


  let cod1Ref = React.createRef();
  let cod3Ref = React.createRef();
  let cod5Ref = React.createRef();
  let cod7Ref = React.createRef();
  let cod9Ref = React.createRef();
  let cod11Ref = React.createRef();
  
  let tallas1Ref = React.createRef();
  let tallas3Ref = React.createRef();
  let tallas5Ref = React.createRef();
  let tallas7Ref = React.createRef();
  let tallas9Ref = React.createRef();
  let tallas11Ref = React.createRef();
  
  let cantidad1Ref = React.createRef();
  let cantidad3Ref = React.createRef();
  let cantidad5Ref = React.createRef();
  let cantidad7Ref = React.createRef();
  let cantidad9Ref = React.createRef();
  let cantidad11Ref = React.createRef();

  //let shopRef = React.createRef();

  let priceRef = React.createRef();
  let collectionnameRef = React.createRef();
  let categoryRef = React.createRef();

  let img1Ref = React.createRef();
  let img2Ref = React.createRef();
  let img3Ref = React.createRef();
  let img4Ref = React.createRef();
  let img5Ref = React.createRef();

  function verProductos() {
    return fetch("http://localhost:3000/api/productos/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function postData1() {
    fetch("http://localhost:3000/api/productos/", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

     
      body: JSON.stringify({
        name: nameRef.current.value,
        description: nameRef.current.value,
        ref: refRef.current.value,
        skus: [ {sku:cod1Ref.current.value , size:tallas1Ref.current.value, quantity:cantidad1Ref.current.value},
                    {sku:cod3Ref.current.value , size:tallas3Ref.current.value, quantity:cantidad3Ref.current.value},
                    {sku:cod5Ref.current.value , size:tallas5Ref.current.value, quantity:cantidad5Ref.current.value},
                    {sku:cod7Ref.current.value , size:tallas7Ref.current.value, quantity:cantidad7Ref.current.value},
                    {sku:cod9Ref.current.value , size:tallas9Ref.current.value, quantity:cantidad9Ref.current.value},
                    {sku:cod11Ref.current.value , size:tallas11Ref.current.value, quantity:cantidad11Ref.current.value}, ],
        
        //shop: shopRef.current.value,
        //tallas: {talla:tallasRef.current.value , cantidad:cantidadRef.current.value},
        images: [img1Ref.current.value,img2Ref.current.value,img3Ref.current.value,img4Ref.current.value,img5Ref.current.value],
        price: priceRef.current.value,
        
        
      }),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        subirCedula();
      };
    })
    
   
  }

  function postData(e) {
    e.preventDefault();
    subirCedula();
  }

  async function subirCedula() {
       
    console.log(archivo)   
    var myFiles = [];
    
    for (var i = 0; i < archivo.length; i++) {
      const data = new FormData(); 
      myFiles.push(archivo[i]);
      data.append("file", myFiles[i]);
      console.log( myFiles[i])
      
      await axios
      .post("http://localhost:3000/uploadfile", data, {})
      .then((res) => {
        console.log(res);
      });
    }    
    console.log(myFiles);
    
  }

  function onChange(event) {
    const myFiles = event.target.files;
    setArchivo(myFiles);
    console.log(event.target.files);
  }

 
  

  return (
    <div>
      <h2>Crear Producto</h2>

      <br />

      <form
      action="/uploadfile"
      method="POST"
      encType="multipart/form-data"
      onSubmit={postData}>
        
      <label>
        <span className="text">REF</span>
        <input type="text" name="cod" ref={refRef} />
        <br></br>
        <br></br>
        <span className="text">NAME</span>
        <input type="text" name="name" ref={nameRef} />
        <br></br>
        <br></br>
        <span className="text">COD1</span>
        <input type="text" name="ref" ref={cod1Ref} />
        
        <span className="text">TALLA1</span>
        <input type="text" name="tallas" ref={tallas1Ref} />
        <span className="text">CANTIDAD</span>
        <input type="text" name="cantidad" ref={cantidad1Ref} />
        <br></br> 

         <span className="text">COD3</span>
        <input type="text" name="ref" ref={cod3Ref} />
        
        <span className="text">TALLA3</span>
        <input type="text" name="tallas" ref={tallas3Ref} />
        <span className="text">CANTIDAD</span>
        <input type="text" name="cantidad" ref={cantidad3Ref} />
        <br></br>    

         <span className="text">COD5</span>
        <input type="text" name="ref" ref={cod5Ref} />
        
        <span className="text">TALLA5</span>
        <input type="text" name="tallas" ref={tallas5Ref} />
        <span className="text">CANTIDAD</span>
        <input type="text" name="cantidad" ref={cantidad5Ref} />
        <br></br>  
        <span className="text">COD7</span>
        <input type="text" name="ref" ref={cod7Ref} />
        
        <span className="text">TALLA7</span>
        <input type="text" name="tallas" ref={tallas7Ref} />
        <span className="text">CANTIDAD</span>
        <input type="text" name="cantidad" ref={cantidad7Ref} />
        <br></br>  
        <span className="text">COD9</span>
        <input type="text" name="ref" ref={cod9Ref} />
        
        <span className="text">TALLA9</span>
        <input type="text" name="tallas" ref={tallas9Ref} />
        <span className="text">CANTIDAD</span>
        <input type="text" name="cantidad" ref={cantidad9Ref} />
        <br></br>  
        <span className="text">COD11</span>
        <input type="text" name="ref" ref={cod11Ref} />
        
        <span className="text">TALLA11</span>
        <input type="text" name="tallas" ref={tallas11Ref} />
        <span className="text">CANTIDAD</span>
        <input type="text" name="cantidad" ref={cantidad11Ref} />
        <br></br>       
        
       
         
        <br></br>
        <span className="text">PRICE</span>
        <input type="text" name="price" ref={priceRef} />
        <br />
        <br></br>
        <span className="text">IMG1</span>
        <input type="text" name="img" ref={img1Ref} />
        <br></br>
        <span className="text">IMG2</span>
        <input type="text" name="img2" ref={img2Ref} />
        <br></br>
        <span className="text">IMG3</span>
        <input type="text" name="img" ref={img3Ref} />
        <br></br>
        <span className="text">IMG4</span>
        <input type="text" name="img2" ref={img4Ref} />
        <br></br>
        <span className="text">IMG5</span>
        <input type="text" name="img2" ref={img5Ref} />
        <br></br>
      </label>
      <br />
      <button onClick={verProductos}>imprimir</button>
      <button onClick={postData}>Crear</button>
      <button>Ver Productos</button>

      <input
            className="inputfile"
            type="file"
            name="file"
            id="file"
            ref={archivoRef}
            onChange={onChange}
            required
            multiple

            //required
          ></input>

          <button type="submit" value="Enviar">
            Guardar
          </button>
      </form>
      <br></br>
      ||<div className="imageFromBD">
          <img src={"http://localhost:3000/image/Beneficios-compra-online.jpg"}
          width="1430px"
          height="300px"/>  
       </div>
    </div>
  );
}
