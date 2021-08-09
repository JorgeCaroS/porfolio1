import React from "react";
import { useState, useEffect, useContext } from "react";
//import "../index.css";
import { useHistory } from "react-router-dom";
import MainHeader from "./MainHeader";
import Cart from "./Cart";
import SizeGuide from "./SizeGuide";
import {MyContext} from "../context/MyContext";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Logo from "../images/logokancan.png";
import { CSSTransition } from 'react-transition-group';
import Imagen23062_01 from "../images/Jeans/23062_01.jpg";

export default function Preview() {
  const history = useHistory();
  const [existencias, setExistencias] = useState();  
 // const {productSelected, setProductSelected} = useContext(MyContext); 
  const [productSelected1,  setProductSelected1] = useState([]);   
  const [mainImage, setMainImage] = useState(Imagen23062_01);    
  const [tiendas, setTiendas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filteredByColor, setFilteredByColor] = useState([]);
  const [sizesByColor,  setSizesByColor] = useState([]); 
  const [shopsByColor,  setShopsByColor] = useState([]); 
  const [name, setName] = useState([]);
  const [reference, setReference] = useState([]);
  const [article, setArticle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);  
  const [sizeSelected, setSizeSelected] = useState([]);
  const [colorSelected, setColorSelected] = useState([]);
  const [productSelectedColors, setProductSelectedColors] = useState([]);
  const [classNamePreviewGallery1, setClassNamePreviewGaller1] = useState([]);
  const [classNamePreviewGallery2, setClassNamePreviewGaller2] = useState([]);
  const [classNamePreviewGallery3, setClassNamePreviewGaller3] = useState([]);
  const [classNamePreviewGallery4, setClassNamePreviewGaller4] = useState([]);
  const [classNamePreviewGallery5, setClassNamePreviewGaller5] = useState([]);
  const [classNameCartButton, setClassNameCartButton] = useState("hidden"); 
  const [classNameCheck, setClassNameCheck] = useState(false); 
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubCategorias] = useState([]);
  const [discount, setDiscount] = useState([]);    
  const [colores, setColores] = useState([]);
  const [search, setSearch] = useState("");
  const [sizes, setSizes] = useState([]);
  let myCategory = React.createRef();
  let mySubCategory = React.createRef();
  const {cart, setCart} = useContext(MyContext); 
  const {cartClassName, setCartClassName} = useContext(MyContext); 
  const { sizeGuideClassName, setSizeGuideClassName } = useContext(MyContext);  
  const [loading1, setLoading1] = useState(true); 
  
  
  
  
  useEffect(() => {
    
    setProductSelected1(JSON.parse(localStorage.getItem("MySelected")));    
    setTiendas( productSelected1.shops);
    setProductSelectedColors( JSON.parse(localStorage.getItem("MySelected")).skus.map((producto)  => producto.color));
    setLoading1(false)
  }, [localStorage.getItem("MySelected")]);

  

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  var categories = [...new Set(categorias)];
  var subcategories = [...new Set(subcategorias)];
  var sizes1 = [...new Set(sizes)];
  var colores1 = [...new Set(productSelectedColors)];
   
  
  

  var myArray = [];
  var i;
  for (i = 0; i < sizes1.length; i++) {
    myArray.push(...sizes1[i]);
  }

  var sizes2 = [...new Set(myArray)];
  sizes2.sort(function (a, b) {
    return a - b;
  });
  //console.log(sizes2);

  
  var mySizes = [];
  for (i = 0; i < sizes2.length; i++) {
    mySizes.push({ value: sizes2[i], label: sizes2[i] });
  }

  var myCategories = [];
  for (i = 0; i < categories.length; i++) {
    myCategories.push({ value: categories[i], label: categories[i] });
  }

  var mySubCategories = [];
  for (i = 0; i < subcategories.length; i++) {
    mySubCategories.push({ value: subcategories[i], label: subcategories[i] });
  } 

  function handleError1() {
    setClassNamePreviewGaller1("preview-gallery-none");
  }
  function handleError2() {
    setClassNamePreviewGaller2("preview-gallery-none");
  }

  function handleError3() {
    setClassNamePreviewGaller3("preview-gallery-none");
  }

  function handleError4() {
    setClassNamePreviewGaller4("preview-gallery-none");
  }

  function handleError5() {
    setClassNamePreviewGaller5("preview-gallery-none");
  }

  let thisSize;
  function handleSize(e) {   
    
    switch (e.target.innerText) {
      case '6':
        thisSize = "1";
        break;
      case '8':
        thisSize = "3";
        break;
      case '10':
        thisSize = "5";
         break;
      case '12':
        thisSize = "7";
        break;
      case '14':
        thisSize = "9";
        break;
      case '16':
        thisSize = "11";
        break;
      case 'XS':
        thisSize = "1";
         break;
      case 'S':
        thisSize = "3";
        break;
      case 'M':
        thisSize = "5";
          break;  

      default:
        thisSize = "0";
    }

    
     setSizeSelected(thisSize);
    let currentIndex = sizesByColor.indexOf(thisSize);
    let currentSizeArray =shopsByColor[currentIndex];
    setExistencias(
     10
    );
      
    if(colorSelected.length >0 && e.target.innerText.length >0 ){     
      setClassNameCartButton("cart-button");
    } 
  }

  function handleColor(e) {
    if(colorSelected.length >0  ){     
      setClassNameCartButton("hidden");
    }
    setSizeSelected([]);
   // console.log(e.target.innerText);
    //console.log(history.location.state.skus)
    setColorSelected(e.target.innerText);
    var filteredByColor1 = productSelected1.skus.reduce(function(filtered, skus) {
      if (skus.color === e.target.innerText) {
         var someNewValue = { skus }
         filtered.push(someNewValue);
      }
      return filtered;
    }, []);
   
    setFilteredByColor(filteredByColor1)
    setSizesByColor(filteredByColor1.map((fp)=>{return fp.skus.size }))
    setShopsByColor(filteredByColor1.map((fp)=>{return fp.skus.shops}))
    setExistencias([])
   // console.log(filteredByColor1.map((fp)=>{return fp.skus.size}))
    //console.log(filteredByColor1.map((fp)=>{return fp.skus.shops})) 
    //console.log(filteredByColor1)      
  }

  


   var mySizes = [];
  
  var sizeArray= JSON.parse(localStorage.getItem("MySelected")).skus.map((size) => size.size);  
  for (var i = 0; i < sizeArray.length; i++) {
    mySizes.push({
      value: sizeArray[i],
      label: sizeArray[i],
    });
  } 


  ////////////////Search Box ///////////////

  const filteredProducts = productos.filter((product) => {
    if (
      product.category.toLowerCase().includes(search) ||
      product.subcategory.toLowerCase().includes(search) ||
      product.price.toString().includes(search) ||
      product.reference.toLowerCase().includes(search)
    ) {
      return product;
    }
  });

  function handleClick(e){     
    setMainImage(Imagen23062_01);
    
  }

  //console.log(JSON.parse(localStorage.getItem('MyCart')))
  function addToCart(){   
    let thisSize1;  
    
    var myCart=[...cart]
   // console.log("Size Selected: " + sizeSelected + "\n"+ "Color Selected: " + colorSelected )
    if(colorSelected.length >0 && sizeSelected.length >0 ){     
      setClassNameCartButton("cart-button"); 
      setCartClassName("cart-container"); 
      switch (sizeSelected) {
        case '1':
          if(productSelected1.article === "bottom"){
          thisSize1="6";
          break;
        }else{ thisSize1="XS"; break;}

        case '3':
          if(productSelected1.article === "bottom"){
          thisSize1="8";
          break;
          } else{ thisSize1="S";break;}
                            
        case '5':
          if(productSelected1.article === "bottom"){
          thisSize1="10";
           break;
          }else{ thisSize1="M";break;}  

        case '7':
          if(productSelected1.article === "bottom"){
          thisSize1="12";
          break;
        }else{ thisSize1="L";break;}  


        case '9':
          if(productSelected1.article === "bottom"){
          thisSize1="14";
          break;
        }else{ thisSize1="XL";break;}  

        case '11':
          if(productSelected1.article === "bottom"){
          thisSize1="16";
          break;
        }else{ thisSize1="XXL";break;}  
       
        default:
          thisSize1="0";

        }
      myCart.push({reference:productSelected1.reference, color:colorSelected, size:thisSize1, price:productSelected1.price, name:productSelected1.name, discount:productSelected1.discount})
      setCart(myCart)
      localStorage.setItem("MyCart",JSON.stringify(myCart));           
    }    
  }

  function handleGuide(){
    setSizeGuideClassName("size-guide")
  }

  if (loading1) {
    return (
      <div className="loadingContainer-checkout">
        <img src={Logo}/>
        <Loader
          type="Rings"
          color="#00BFFF"
          height={150}
          width={150}
          timeout={6000}
        />
      </div>
    );
  }

  
   

  return (
    <CSSTransition
    in={true}
    appear={true}
    timeout={600}
    classNames="fade"
  >
    <div id="PreviewMain" className="PreviewMain">
      <MainHeader/>
      <SizeGuide/>
      
      <div id="PreviewImage" className="Previewimage">
        <figure>
          <img
            id="_01.jpg"
            className="previewMainImage"
            src={mainImage}
            alt={productSelected1.name}
            onClick={handleClick}
          />
          {/* <button className="hvr-bubble-float-top"> Comprar</button> */}
        </figure>

        <div id="PreviewGallery" className="PreviewGallery">
        <img
          className={classNamePreviewGallery2}
          id="_02.jpg"
          width="120px"
          src={Imagen23062_01}
          alt={productSelected1.name}
          onClick={handleClick}
          onError={handleError2}
        />
        <img
          className={classNamePreviewGallery3}
          id="_03.jpg"
          width="120px"
          src={Imagen23062_01}
          alt={productSelected1.name}
          onClick={handleClick}
          onError={handleError3}
        />
        <img
          className={classNamePreviewGallery4}
          id="_04.jpg"
          width="120px"
          src={Imagen23062_01 }
          alt={productSelected1.name}
          onClick={handleClick}
          onError={handleError4}
        />
        <img
          className={classNamePreviewGallery5}
          id="_05.jpg"
          width="120px"
          src={Imagen23062_01 }
          alt={productSelected1.name}
          onClick={handleClick}
          onError={handleError5}
        />
      </div>

        <div className="preview-description1">
          <div className="previewHeader">
            <h1 className="preview-product-name">{productSelected1.name} </h1>
            <p className="preview-reference-title">Ref {productSelected1.reference}</p>
            
            <div className="preview-prices">
            <p className="preview-reference-price"> {formatterPeso.format(productSelected1.price.$numberInt)}</p>            
            <p className="preview-reference-price-discount"> {formatterPeso.format(productSelected1.price.$numberInt - productSelected1.price.$numberInt *  productSelected1.discount.value.$numberDouble)}</p>
            </div>
          </div>

          <p className="select-size-span">Elige un Color</p>
          <div className="select-color">
            {colores1.map((color) => (
              <div
                key={Math.floor(Math.random() * 10001)}
                onClick={handleColor}
               // className={"preview-singlecolor-"+color} 
               className={colorSelected === color
              ? "preview-singlecolor-"+color+"-selected" :"preview-singlecolor-"+color}                  
              >
               <p className="hide-span">{color}</p>
              </div>
            ))}
          </div>
          <p className="select-size-span">Elige una talla</p>
          <div className="select-size1">
            {filteredByColor.map((fp) => (
              <div
                key={Math.floor(Math.random() * 10001)}
                onClick={handleSize}
                className={
                  sizeSelected === fp.skus.size
                    ? "preview-singlesize-item1"
                    : "preview-singlesize-item"
                }
              >
                <p>{fp.skus.size === "1" && productSelected1.article === "bottom" ? "6" :
                   fp.skus.size === "1" && productSelected1.article === "top" ? "XS" :
                  fp.skus.size === "3" && productSelected1.article === "bottom" ? "8" :
                  fp.skus.size === "3" && productSelected1.article === "top" ? "S" :
                  fp.skus.size === "5" && productSelected1.article === "bottom" ? "10" :
                  fp.skus.size === "5" && productSelected1.article === "top" ? "M" :
                  fp.skus.size === "7" && productSelected1.article === "bottom" ? "12" :
                  fp.skus.size === "9" && productSelected1.article === "bottom" ? "14" :
                  fp.skus.size === "11" && productSelected1.article === "bottom" ? "16" :
                  fp.skus.size}</p>   
              </div>
              
            ))}
          </div>
         {/* <h3>¿ Cuál es mi talla ?'</h3>
           <div className="size-container">
            
            <div className="size-titles">
            <span>Talla Kancan</span>
            <span>Talla Convencional</span>   
            </div>
          <div className="select-size1">
            {filteredByColor.map((fp) => (
              <div
                key={Math.floor(Math.random() * 10001)}
                
                className={
                  sizeSelected === fp.skus.size
                    ? "preview-singlesize-item-square1"
                    : "preview-singlesize-item-square"
                }
              >

                
                <div  className="square">{fp.skus.size}</div>
                
                { <div className="square">{
                  fp.skus.size === "1" ? "6" :
                  fp.skus.size === "3" ? "8" :
                  fp.skus.size === "5" ? "10" :
                  fp.skus.size === "7" ? "12" :
                  fp.skus.size === "9" ? "14" :
                  fp.skus.size === "11" ? "16" :
                  fp.skus.size}</div> }
                  </div>
                
              
              
            ))}
          </div>
          </div> */}
          
          <p className="size-guide-link" onClick={handleGuide}>Guía de tallas</p>
          <div className="preview-select-quantity">
            <p> {existencias} Disponibles</p>
          </div>
          <button className={classNameCartButton} onClick={addToCart}><span id="cart-icon1" className="material-icons md-dark">local_grocery_store</span> Agregar al Carrito</button>
           

          <div className="preview-product-description">
           <h3>Descripción</h3>
           <p>{productSelected1.description}</p>
          </div>

            
        </div>
        <div className="cart-wrap">
          <Cart cartClassName={cartClassName}/>
        </div> 
            
        
      </div>

      <br></br>
      <br></br>
      <br></br>
      

      
    </div>
    </CSSTransition>
  );

}
