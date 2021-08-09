import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../Logo.png";
import MediosPago from "../images/MediosPago.jpg";
import CarouselTop from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {MyContext} from "../context/MyContext";
import staticdata from "./staticdata";
import Imagen23062_01 from "../images/Jeans/23062_01.jpg";



//export default function MainHeader({ products ,myCategories,mySubCategories}) {
export default function MainHeader() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [classNameFilter, setClassNameFilter] = useState("search-result1");
  const {cart, setCart} = useContext(MyContext); 
  const {cartClassName, setCartClassName} = useContext(MyContext);
  const {products, setProducts} = useContext(MyContext);
  const {productsForFilter, setProductsForFilter} = useContext(MyContext);  
  const {productSelected, setProductSelected} = useContext(MyContext); 
  const {categoryFilter, setCategoryFilter} = useContext(MyContext); 
  const {subcategoryFilter, setSubcategoryFilter} = useContext(MyContext); 
  const {colorFilter, setColorFilter} = useContext(MyContext); 
  const {sizeFilter, setSizeFilter} = useContext(MyContext);    
  const [loading1, setLoading1] = useState(true);  
  
  

  
  

  const filteredProducts = productsForFilter.filter((product) => {
    
    if (
      product.category.toLowerCase().includes(search) ||
      product.subcategory.toLowerCase().includes(search) ||
      ((product.price)-(product.price.$numberInt * product.discount.value)).toString().includes(search) ||
      product.reference.toLowerCase().includes(search)
    ) {
      return product;
    }
  });


  
  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })


  function handleClickShop(){
    history.push({
      pathname: `/tienda`
    });    
  }

  function handleClickAccount(){
    history.push({
      pathname: `/cuenta`
    });
    
  }


  
  function handleClickHome(){
    history.push({
      pathname: `/inicio`
    });    
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


  function handleCart(){
    setCartClassName("cart-container")
  }

  async function handleThumb(e){
    
    var myId = e.target.id;
    const result = await fetch("http://localhost:3000/api/productos/"+myId,{
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",           
          "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
         "Content-Type": "application/json", 
      },});
      const dataNoFilter = await result.json();
      const data = staticdata;
      for (var j2 = 0; j2 < data.skus.length; j2++) {
        for (var k2 = data.skus[j2].shops.length - 1; k2 >= 0; k2--) {
          if (
            data.skus[j2].shops[k2].store !== "015" &&
            data.skus[j2].shops[k2].store !== "022" &&
            data.skus[j2].shops[k2].store !== "005"
          ) {
            var elLenght = data.skus[j2].shops.splice(k2, 1).length;
            
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
      console.log(dataNoFilter)
      localStorage.setItem("MySelected",JSON.stringify(data))
      setProductSelected(data);
      history.push({
        pathname: `/inicio/producto/${data.reference}`
      })
  }
      

  

  return (
    <div className="MainHeader-Wraper" id="MainHeader-Wraper">
    <div id="MainHeader" className="MainHeader">      
    <div className="header-carousel">
    <CarouselTop
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={ true }
              autoPlaySpeed={4000}
              keyBoardControl={true}
              customTransition="transform 4000ms ease-in-out"              
              transitionDuration={4000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              arrows={false}   
              showDots={false}           
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-10-px"
            >
              <div className="header-carousel-item1">
                <h4  className="header-carousel-title"> Envíos gratis por compras superiores a $200.000</h4>                                                
              </div>
              <div className="header-carousel-item2">
                <h4 className="header-carousel-title"> Compra fácil y rápido con Sistecrédito o Pago contraentrega</h4>               
              </div>
              <div className="header-carousel-item1">
                <h4 className="header-carousel-title"> ¡Aprovecha el descuento del 20% en toda nuestra tienda! </h4>               
              </div>
              <div className="header-carousel-item4">
                <img src={MediosPago} />               
              </div>
              
            
             
            
        </CarouselTop>
        </div>
      <div className="MainHeader-background">
        <div className="MainHeader-top">
          <div className="top-navbar">
        
            <div className="searchBox">
            
              <input className="search-input"
                type="text"
                placeholder="Buscar"               
                onChange={(e) => {
                    if(e.target.value){
                        setClassNameFilter("search-result")}
                        else{setClassNameFilter("search-result1")}
                        setSearch(e.target.value.toLowerCase());
                }}
              />
              <span id="search-text"className="material-icons md-50">search</span> 
              
              <label onClick={handleClickAccount} id="account-text">CUENTA</label>      
              <span id="account-icon" className="material-icons md-dark">account_circle</span>  

              <label onClick={handleCart} id="cart-text">CARRITO</label>      
              <span id="cart-icon3" className="material-icons md-dark">local_grocery_store</span>               
              <p className="cart-items-number">{cart.length}</p>
              
                     
               
               <div className={classNameFilter}>
           
              {filteredProducts.map((product) => (
                <div  className="single-item-filter"
                  key={Math.floor(Math.random() * 10001)}                  
                >   
                
                <div  className="singleDescFilter">              
                  {product.category} <br></br>
                  {product.subcategory}<br></br>                  
                  {formatterPeso.format(product.price.$numberInt - product.price.$numberInt *  product.discount.value.$numberDouble)}
                  <br></br>
                  <button id={product._id} onClick={handleThumb} className="thumb-button">Ver</button>
                </div>
                  <div  className="singleImgFilter">  
                   <img src={Imagen23062_01} />              
                   {/* <img src={product.images[0]} />  */}
                  </div>
                  
                </div>
              ))}
            </div>
          
            </div>

           
          
          </div>
        
          <div className="bot-navbar">

          
            <img
              src={Logo}
              className="logoHeader"
              alt="logoHeader"
              width="120px"
              height="40px"
            />
            <div className="mynavbar">
              <a onClick={handleClickHome}>INICIO</a>
              <a onClick={handleClickShop}>TIENDA</a>
             
              <div className="dropdown">
                <button className="dropbtn">
                  PRODUCTOS
                  
                </button>
                <div className="dropdown-content">
                  <div className="row">
                  
                    <div className="column">
                      <h3>Categorias</h3>
                      {categoryFilter.map((category) => (
                        
                      <a key={category} href="https://kancanjeanscolombia.com">{category}</a>
                      
                      ))}
                    </div>

                    <div className="column">
                      <h3>Subcategorias</h3>
                      {subcategoryFilter.map((subcategory) => (
                        
                      <a key={subcategory} href="https://kancanjeanscolombia.com">{subcategory}</a>
                      
                      ))}
                    </div>

                    <div className="column">
                      <h3>Subcategorias</h3>
                      {subcategoryFilter.map((subcategory) => (
                        
                      <a key={subcategory} href="https://kancanjeanscolombia.com">{subcategory}</a>
                      
                      ))}
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
    </div>
  );
}
