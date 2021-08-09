import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import "../index.css";
import { useHistory, withRouter } from "react-router-dom";
import Product from "./Product";
import MainHeader from "./MainHeader";
import Cart from "./Cart";
import { MyContext } from "../context/MyContext";
import { CSSTransition } from 'react-transition-group';



const filtersFn = {
  category: (results, search) => {
    return results.filter((producto) => producto.category === search);
  },
  subcategory: (results, search) => {
    return results.filter((producto) => producto.subcategory === search);
  },
  size: (results, search) => {
    var articleKind;
    switch (search) {
      case '6':
        search = "1";
        articleKind = "bottom";
        break;
      case '8':
        search = "3";
        articleKind = "bottom";
        break;
      case '10':
        search = "5";
        articleKind = "bottom";
         break;
      case '12':
        search = "7";
        articleKind = "bottom";
        break;
      case '14':
        search = "9";
        articleKind = "bottom";
        break;
      case '16':
        search = "11";
        articleKind = "bottom";
        break;
      case 'XS':
        search = "1";
        articleKind = "top";
          break;
      case 'S':
        search = "3";
        articleKind = "top";
        break;
      case 'M':
        search = "5";
        articleKind = "top";
          break;  
     
      default:
        search = "0";
        articleKind = "0"
    }
    return results.filter((producto) =>
    (producto.article === articleKind && producto.skus.some((skus) => skus.size === search)) 
      //console.log()
     // producto.skus.some((skus) => skus.size === search))
    )
    ;
  },
  color: (results, search) => {
    return results.filter((producto) =>
      producto.skus.some((skus) => skus.color === search)
    );
  },
  price: (results, search) => {
    console.log(search);
    return results;
  },
};

function sortDown(a, b) {
  // Use toUpperCase() to ignore character casing
  const priceA = a.price;
  const priceB = b.price;

  let comparison = 0;
  if (priceA > priceB) {
    comparison = 1;
  } else if (priceA < priceB) {
    comparison = -1;
  }
  return comparison;
}

function sortUp(a, b) {
  
  const priceA = a.price;
  const priceB = b.price;

  let comparison = 0;
  if (priceA < priceB) {
    comparison = 1;
  } else if (priceA > priceB) {
    comparison = -1;
  }
  return comparison;
}

function applyFilter(productos = [], filters = {}) {
  let results = [...productos];
  Object.keys(filters).map((filterName) => {
    const search = filters[filterName];
    if (search) {
      results = filtersFn[filterName](results, search);
    }
    if (search === "priceUp") {
      results.sort(sortUp);
    }
    if (search === "priceDown") {
      results.sort(sortDown);
    }
  });
  return results;
}

export default function Shop({
  name,
  url,
  cantidad,
  tallas,
  pruebas,
  clicked1,
}) {
  const history = useHistory();
  const [mainImage, setMainImage] = useState("http://localhost:3000/image/_01.jpg");
  const [clicked, setClicked] = useState();
  const [currentURL, setURL] = useState();
  const [loading1, setLoading1] = useState(true);
  const [productos, setProductos] = useState([]);
  const [name1, setName1] = useState([]);
  const [reference1, setReference1] = useState([]);
  const [article1, setArticle1] = useState([]);
  const [price1, setPrice1] = useState([]);
  const [discount1, setDiscount1] = useState([]);  
  const [skus, setSkus] = useState([]);
  const [tallas1, setTallas1] = useState([]);
  const [tallas2, setTallas2] = useState([]);
  const [colores1, setColores1] = useState([]);
  const [colores2, setColores2] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);
  const [colorSelected, setColorSelected] = useState([]);
  const [classNameCartButton, setClassNameCartButton] = useState("hidden");   
  const [filteredByColor, setFilteredByColor] = useState([]);
  const [sizesByColor,  setSizesByColor] = useState([]); 
  const [shopsByColor,  setShopsByColor] = useState([]); 
  const [existencias, setExistencias] = useState();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    size: null,
    color: null,
    article:null,
  });
  const { cartClassName, setCartClassName } = useContext(MyContext);
  const { classNamePopup, setClassNamePopup } = useContext(MyContext);
  const { products, setProducts } = useContext(MyContext);
  const {productSelected, setProductSelected} = useContext(MyContext);
  const { categoryFilter, setCategoryFilter } = useContext(MyContext);
  const { subcategoryFilter, setSubcategoryFilter } = useContext(MyContext);
  const { colorFilter, setColorFilter } = useContext(MyContext);
  const { sizeFilter, setSizeFilter } = useContext(MyContext);
  const {cart, setCart} = useContext(MyContext); 



   useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:3000/api/productos/", {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + btoa("devops2021*:devops2021*"),
          "Content-Type": "application/json",
        },
      });
      const dataNoFilter = await result.json();
      const data = await dataNoFilter;
  
      //// Loop for hide products with no units/////
  
      for (var i2 = 0; i2 < data.length; i2++) {
       
  
        
        
        for (var j2 = 0; j2 < data[i2].skus.length; j2++) {        
          for (var k2 = data[i2].skus[j2].shops.length - 1; k2 >= 0; k2--) {
            if (
              data[i2].skus[j2].shops[k2].store !== "015" &&
              data[i2].skus[j2].shops[k2].store !== "022" &&
              data[i2].skus[j2].shops[k2].store !== "005" 
              
            ) {
              var elLenght = data[i2].skus[j2].shops.splice(k2, 1).length;
              
            }
          }
        }
      }
  
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].skus.length; j++) {
          for (var k = data[i].skus[j].shops.length - 1; k >= 0; k--) {
            if (data[i].skus[j].shops[k].quantity === 0) {                                    
              var elLenght = data[i].skus[j].shops.splice(k, 1);
              if (data[i].skus[j].shops.length === 0) {
                data[i].skus.splice(j, 1);                
              j--;
              
              }
              if(data[i].skus.length === 0 ){
                data.splice(k,1)
              }
              
            
            }
          }
        }
      }
  
     
      setProducts(data);
      //console.log(data)
  
  
      setLoading1(false);
    }
    fetchData();
   
  }, [loading1]); 

  


  async function handleClick(mykey){

    const result = await fetch("http://localhost:3000/api/productos/"+mykey,{
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",           
          "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
         "Content-Type": "application/json", 
      },});
      const dataNoFilter = await result.json();
      const data = await dataNoFilter;     
      
        for (var j2 = 0; j2 < data.skus.length; j2++) {
          for (var k2 = data.skus[j2].shops.length - 1; k2 >= 0; k2--) {
            if (
              data.skus[j2].shops[k2].store !== "015" &&
              data.skus[j2].shops[k2].store !== "022" &&
              data.skus[j2].shops[k2].store !== "005"
            ) {
              var elLenght = data.skus[j2].shops.splice(k2, 1).length;
              //var elLenght = data[i2].skus[j2].shops.splice(k2, 1).length;
            }
          
        }
      }
      
        for (var j = 0; j < data.skus.length; j++) {
          for (var k = data.skus[j].shops.length - 1; k >= 0; k--) {
            if (data.skus[j].shops[k].quantity === 0) {
              var elLenght = data.skus[j].shops.splice(k, 1).length;
              if (data.skus[j].shops.length === 0) {
                data.skus.splice(j, 1);
                j--;
                
              }
              
            }          
        }
      }
      
      setProductSelected(data);
      localStorage.setItem("MySelected",JSON.stringify(data))
        history.push({
          pathname: `/inicio/producto/${data.reference}`
        })
  }

  

   function handleClick1(
    reference,
    article,
    url,
    size,
    skus,
    shops,
    name,
    selected,
    description,
    price,
    discount
  ) {
    setMainImage("http://localhost:3000/image/"+reference+"_01.jpg")
    setClicked({ reference });
    setURL({ url });
    setSkus(skus);    
    setName1(name);
    setReference1(reference);
    setArticle1(article);
    setPrice1(price);
    setDiscount1(discount);
    setTallas1(skus.map((sku) => sku.size));
    setColores1(skus.map((sku) => sku.color));

    //console.log(article)
    setTallas2([...new Set(skus.map((sku) => sku.size))]);
    setColores2([...new Set(skus.map((sku) => sku.color))]);

   
  } 

  function filterHandler(e) {
   
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    const clone = {
      ...filters,
      [id]: value,
    };
    setFilters(clone);
    
  }

  ////////////////Search Box ///////////////

  const filteredProducts = products.filter((product) => {
    if (
      product.category.toLowerCase().includes(search) ||
      product.subcategory.toLowerCase().includes(search) ||
      product.price.toString().includes(search) ||
      product.reference.toLowerCase().includes(search)
    ) {
      return product;
    }
  });

  const resultsFiltered = applyFilter(products, filters);

  

  function handleColor(e) {
     if(colorSelected.length >0  ){     
      setClassNameCartButton("hidden");      
    } 
    setSizeSelected([]);     
    setColorSelected(e.target.innerText);
    
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
      currentSizeArray.reduce((sum, { quantity }) => sum + quantity, 0)
    );
      
    if(colorSelected.length >0 && e.target.innerText.length >0 ){     
      setClassNameCartButton("cart-button");
    } 
  }

  function handlePopup(){
    setClassNamePopup("hidden");
    setSizeSelected([]);
  }

  function addToCart(){     
    let thisSize1;  
    var myCart=[...cart];    
    if(colorSelected.length >0 && sizeSelected.length >0 ){     
      setClassNameCartButton("cart-button"); 
      setCartClassName("cart-container"); 

     
      
      switch (sizeSelected) {
        case '1':
          if(article1 === "bottom"){
          thisSize1="6";
          break;
        }else{ thisSize1="XS"; break;}

        case '3':
          if(article1 === "bottom"){
          thisSize1="8";
          break;
          } else{ thisSize1="S";break;}
                            
        case '5':
          if(article1 === "bottom"){
          thisSize1="10";
           break;
          }else{ thisSize1="M";break;}  

        case '7':
          if(article1 === "bottom"){
          thisSize1="12";
          break;
        }else{ thisSize1="L";break;}  


        case '9':
          if(article1 === "bottom"){
          thisSize1="14";
          break;
        }else{ thisSize1="XL";break;}  

        case '11':
          if(article1 === "bottom"){
          thisSize1="16";
          break;
        }else{ thisSize1="XXL";break;}  
       
        default:
          thisSize1="0";

        }
      
      
      myCart.push({reference:reference1, color:colorSelected, size:thisSize1 , price:price1, name:name1, discount:discount1})
      setCart(myCart)
      localStorage.setItem("MyCart",JSON.stringify(myCart));           
    }   
  } 
  

  return (
    <CSSTransition
    in={true}
    appear={true}
    timeout={600}
    classNames="fade"
  >
    <div className="App">      
      <MainHeader />

      <div className={classNamePopup}>  
      <div className="preview-popup-visible">
      <div className="preview-popup-part1"> 
        
        <figure>
          <img
            id="_01.jpg"
            className="popup-image"
            src={mainImage}
            alt="singleProduct"
           
          />
           <button className="hvr-bubble-float-top"> Comprar</button> 
        </figure>
        </div> 
        <div className="preview-popup-part2"> 
        <div className="cart-icon4" onClick={handlePopup}>
          <span>Cerrar</span>       
        </div>
        <h2>{name1}</h2>
        <p className="select-size-span">Elige un Color</p>
          <div className="select-color">
            {colores2.map((color) => (
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
          <div className="select-size">
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
                <p>{fp.skus.size === "1" && article1 === "bottom" ? "6" :
                   fp.skus.size === "1" && article1 === "top" ? "XS" :
                  fp.skus.size === "3" && article1 === "bottom" ? "8" :
                  fp.skus.size === "3" && article1 === "top" ? "S" :
                  fp.skus.size === "5" && article1 === "bottom" ? "10" :
                  fp.skus.size === "5" && article1 === "top" ? "M" :
                  fp.skus.size === "7" && article1 === "bottom" ? "12" :
                  fp.skus.size === "9" && article1 === "bottom" ? "14" :
                  fp.skus.size === "11" && article1 === "bottom" ? "16" :
                  []}</p>   
              </div>
              
            ))}
            </div> 
            <p className="select-size-spa">{productSelected.description}</p>    
            <button className={classNameCartButton} onClick={addToCart}><span id="cart-icon1" className="material-icons md-dark">local_grocery_store</span><span id="cart-add-title"> Agregar al Carrito</span></button>         
            </div>
            
          </div>
        
      </div>

      <div className="main-filter">
        <div>
          <select
            id="category"
            onChange={filterHandler}
            className="filter-selection"
          >
            <option hidden selected>
              Categoría
            </option>
            <option value="">Todas</option>
            {categoryFilter.map((categoryName) => (
              <option value={categoryName}>{categoryName}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="subcategory"
            onChange={filterHandler}
            className="filter-selection"
          >
            <option hidden selected>
              Subcategoría
            </option>
            <option value="">Todas</option>
            {subcategoryFilter.map((subcategoria) => (
              <option value={subcategoria}>{subcategoria}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="size"
            onChange={filterHandler}
            className="filter-selection"
          >
            <option hidden selected>
              Talla
            </option>
            <option value="">Todas</option>
            {sizeFilter.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="color"
            onChange={filterHandler}
            className="filter-selection"
          >
            <option hidden selected>
              Color
            </option>
            <option value="">Todos</option>
            {colorFilter.map((color) => (
              <option value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="price"
            onChange={filterHandler}
            className="filter-selection"
          >
            <option hidden selected>
              Precio
            </option>
            <option value="">Todos</option>
            <option value="priceUp">El más alto</option>
            <option value="priceDown">El más bajo</option>
          </select>
        </div>

        <br></br>
      </div>
      <div className="cart-wrap">
        <Cart  />
      </div>

      {
        <div className="Galeria">
          {resultsFiltered.map((producto) => (
            <Product
              key={producto._id}   
              mykey={producto._id}            
              productos={productos}
              category={producto.category}
              subcategory={producto.subcategory}
              clicked={handleClick}   
              clicked1={handleClick1}            
              reference={producto.reference}
              article={producto.article}
              name={producto.name}
              price={producto.price}
              description={producto.description}
              discount={producto.discount}
              skus={producto.skus}
              size={producto.skus.map((size) => size.size)}
              shops={producto.skus.map((size) => size.shops)}
              quantity={producto.skus.reduce(
                (sum, { quantity }) => sum + quantity,
                0
              )}
            />
          ))}
        </div>
      }
      
    </div>
    </CSSTransition>
  );
}
