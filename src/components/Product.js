import { useState, useEffect, useContext } from "react";
import {MyContext} from "../context/MyContext";
import { useHistory } from "react-router-dom";

export default function Product({
  mykey,
  reference,
  article,
  name,
  category,
  subcategory,
  url,
  quantity,
  clicked,
  clicked1,
  size,
  skus,
  shops, 
  price,
  productos,
  description,
  discount
}) {

  const [colorSelected, setColorSelected] = useState([]);
  const [classNameCartButton, setClassNameCartButton] = useState("hidden");
  const [sizeSelected, setSizeSelected] = useState([]);
  const [filteredByColor, setFilteredByColor] = useState([]);
  const [sizesByColor,  setSizesByColor] = useState([]); 
  const [shopsByColor,  setShopsByColor] = useState([]); 
  const [classNameTransparent,  setClassNameTransparent] = useState("product-transparent-hidden"); 
  const [existencias, setExistencias] = useState(); 
  const [productSelectedColors, setProductSelectedColors] = useState([]);
  const {cart, setCart} = useContext(MyContext); 
  const {cartClassName, setCartClassName} = useContext(MyContext); 
  const { classNamePopup, setClassNamePopup } = useContext(MyContext);
  

  useEffect(async () => {     
    setProductSelectedColors(skus.map((sku)  => sku.color));
     } 
  
  ,[])

  var myColors = [...new Set(productSelectedColors)];

  

  function setClicked() {
    clicked(mykey, reference, article, url, size, skus,shops, name, productos, description, price, discount); 
    //console.log(reference);    
  }

  function setClicked1() {
    clicked1(reference,article, url, size, skus,shops, name, productos, description, price, discount); 
    setClassNamePopup("preview-popup");
   // console.log(reference);    
  }

  

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  function handleColor(e) {
    if(colorSelected.length >0  ){     
      setClassNameCartButton("hidden");
    }
    setSizeSelected([]);
   // console.log(e.target.innerText);
    //console.log(history.location.state.skus)
    setColorSelected(e.target.innerText);
    //console.log(e.target.innerText)
    var filteredByColor1 = skus.reduce(function(filtered, skus) {
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
        
  }

  let thisSize;
  function handleSize(e) {
    //console.log(e.target.innerText);
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
      currentSizeArray.reduce((sum, { quantity }) => sum + quantity, 0)
    );
      
    if(colorSelected.length >0 && e.target.innerText.length >0 ){     
      setClassNameCartButton("cart-button");
    }
  }

  function addToCart(){     
    let thisSize1;  
    var myCart=[...cart]
    console.log("Size Selected: " + sizeSelected + "\n"+ "Color Selected: " + colorSelected )
    if(colorSelected.length >0 && sizeSelected.length >0 ){     
      setClassNameCartButton("cart-button"); 
      setCartClassName("cart-container"); 
      
      switch (sizeSelected) {
        case '1':
          if(article === "bottom"){
          thisSize1="6";
          break;
        }else{ thisSize1="XS"; break;}

        case '3':
          if(article === "bottom"){
          thisSize1="8";
          break;
          } else{ thisSize1="S";break;}
                            
        case '5':
          if(article === "bottom"){
          thisSize1="10";
           break;
          }else{ thisSize1="M";break;}  

        case '7':
          if(article === "bottom"){
          thisSize1="12";
          break;
        }else{ thisSize1="L";break;}  


        case '9':
          if(article === "bottom"){
          thisSize1="14";
          break;
        }else{ thisSize1="XL";break;}  

        case '11':
          if(article === "bottom"){
          thisSize1="16";
          break;
        }else{ thisSize1="XXL";break;}  
       
        default:
          thisSize1="0";

        }       
      myCart.push({reference:reference, color:colorSelected, size:thisSize1,price:price, name:name, discount:discount})
      setCart(myCart)
      localStorage.setItem("MyCart",JSON.stringify(myCart));           
    }    
  }

  function handleClose(){
    setClassNameTransparent("product-transparent-hidden")

  }

  function handleOpen(){
    //console.log(article)
    setClassNameTransparent("product-transparent")

  }
  
  
  

  return (
    <div  id="Product" className="Product">
      
      <p className="product-name">{name} </p>
      
      <figure     >
      <div className="product-main-img-div">
      <div className={classNameTransparent}>
        <div className="preview-description">
      <span onClick={handleClose} id="close-transparent" className="material-icons md-dark">close</span>
      <p className="select-size-span">Elige un Color</p>
      <div className="select-color">
      {myColors.map((color) => <div
                key={Math.floor(Math.random() * 10001)}
                onClick={handleColor}
               // className={"preview-singlecolor-"+color} 
               className={colorSelected === color
              ? "preview-singlecolor-"+color+"-selected" :"preview-singlecolor-"+color}                  
              >
               <p className="hide-span">{color}</p>
              </div>)}
        </div>
        <p className="select-size-span">Elige una talla</p>
        <div className="select-size">
            {filteredByColor.map((sku) => (
              <div
                key={Math.floor(Math.random() * 10001)}
                onClick={handleSize}
                className={
                  sizeSelected === sku.skus.size
                    ? "preview-singlesize-item1"
                    : "preview-singlesize-item"
                }
              >
                <p>{sku.skus.size === "1" && article === "bottom" ? "6" :
                   sku.skus.size === "1" && article === "top" ? "XS" :
                   sku.skus.size === "3" && article === "bottom" ? "8" :
                   sku.skus.size === "3" && article === "top" ? "S" :
                   sku.skus.size === "5" && article === "bottom" ? "10" :
                   sku.skus.size === "5" && article === "top" ? "M" :
                   sku.skus.size === "7" && article === "bottom" ? "12" :
                   sku.skus.size === "9" && article === "bottom" ? "14" :
                   sku.skus.size === "11" && article === "bottom" ? "16" :
                   sku.skus.size}</p>   
              </div>
              
            ))}
          </div>

          <button className={classNameCartButton} onClick={addToCart}><span id="cart-icon1" className="material-icons md-dark">local_grocery_store</span><span id="cart-add-title1"> Agregar al Carrito</span></button>
          </div>          
      </div>
      <div className="hvr-wobble-to-top-right">
        <p>{discount.name} </p>
      </div>
      
      <span onClick={setClicked1} id="product-eye" className="material-icons md-dark">visibility</span>    
        <img id={mykey}  onClick={setClicked} className="product-main-img"src={"http://localhost:3000/image/"+reference+"_01.jpg"} alt={name} 
        onMouseOver={e => (e.currentTarget.src = "http://localhost:3000/image/"+reference+"_02.jpg")}
        onMouseOut={e => (e.currentTarget.src = "http://localhost:3000/image/"+reference+"_01.jpg")} 
       />

         
      </div>

      <button className="hvr-bubble-float-top" onClick={handleOpen} /*onClick={setClicked}*/>
          {" "}
          Comprar
        </button> 

              
        
      </figure>
      <div className="price-container">
        <h3 className="product-price">{formatterPeso.format(price)}</h3>  
        <p className="product-price-discount"> {formatterPeso.format(price - price *  discount.value)}</p> 
        </div>   
     
      <br></br>
      
    </div>
  );
}
