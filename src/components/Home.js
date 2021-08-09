import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Shop from "./Shop";
import Banner2 from "../images/Banner2.jpg";
import Banner3 from "../images/Banner3.jpg";
import Banner4 from "../images/Banner4.jpg";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Logo from "../images/logokancan.png";
import GirlfriendIMG from "../images/Girlfriend.png";
import CulotteIMG from "../images/Culotte.png";
import StraightIMG from "../images/Straight.png";
import SkinnyIMG from "../images/Skinny.png";
import MomIMG from "../images/Mom.png";
import MediosPago from "../images/MediosPago.jpg";
import Beneficios from "../images/Beneficios.jpg";
import MainHeader from "./MainHeader";
import Cart from "./Cart";
import Footer from "./Footer";
import makeAnimated from "react-select/animated";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Carousel1 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MyContext } from "../context/MyContext";
import { CSSTransition } from 'react-transition-group';

export default function Home({
  name,
  url,
  cantidad,
  tallas,
  pruebas,
  clicked1,
}) {
  const history = useHistory();
  const { cart, setCart } = useContext(MyContext);
  const [clicked, setClicked] = useState();
  const [currentURL, setURL] = useState();
  const [loading1, setLoading1] = useState(true);  
  const [productos, setProductos] = useState([]);
  const [colecciones, setColecciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubCategorias] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [subcategoriesFilter, setSubCategoriesFilter] = useState([]);
  const [sizesFilter, setSizesFilter] = useState([]);
  const [myCategory1, setMyCategory1] = useState([]);
  const [categories1, setCategories1] = useState([]);
  const {cartClassName, setCartClassName} = useContext(MyContext);
  const {products, setProducts} = useContext(MyContext);  
  const {categoryFilter, setCategoryFilter} = useContext(MyContext); 
  const {subcategoryFilter, setSubcategoryFilter} = useContext(MyContext); 
  const {colorFilter, setColorFilter} = useContext(MyContext); 
  const {sizeFilter, setSizeFilter} = useContext(MyContext);  
  
  
  let nombreRef = React.createRef();
  let generoRef = React.createRef();
  let mailRef = React.createRef();
  let telefonoRef = React.createRef();

  const animatedComponents = makeAnimated();
  const [search, setSearch] = useState("");
  let myCategory = React.createRef();
  let mySubCategory = React.createRef();



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
              var elLenght = data[i].skus[j].shops.splice(k, 1).length;
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

      function sortUp(a, b) {
  
        const priceA = parseInt(a.collectionname);
        const priceB = parseInt(b.collectionname);
      
        let comparison = 0;
        if (priceA < priceB) {
          comparison = 1;
        } else if (priceA > priceB) {
          comparison = -1;
        }
        return comparison;
      }

      data.sort(sortUp);


      
      setColecciones([...new Set (data.map((producto) => producto.collectionname))]);
      
      var ultimaColeccion = ([...new Set (data.map((producto) => producto.collectionname))][0])
      
       for (var i3 = 0; i3 < data.length; i3++) {           
        if(data[i3].collectionname !== ultimaColeccion){         
          var elLenght1 = data.splice(i3, 1);
          i3--;
        }
      } 
  
  
      
      setProducts(data);
      
  
  
      setLoading1(false);
    }
    fetchData();
   
  }, [products.length]);

  

  function handleClick(reference, url, size, images, discount) {
    setClicked({ reference });
    setURL({ url });
    console.log(reference);
    history.push({
      pathname: `/inicio/producto/${reference}`,
      state: {
        reference: reference,
        url: url,
        size: size,
        images: images,
        discount: discount,
      },
    });
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
  ///////////////////////////////////////////////////////////

  const items = [
    {
      src: { Banner2 },
      caption: "Slide 1",
    },
    {
      src: { Banner2 },
      caption: "Slide 2",
    },
    {
      src: { Banner2 },
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };


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
    <div className="App-home">

    

      <div className="cart-wrap">
        <Cart/>
      </div>

      <MainHeader />

      <div className="main-carousel2">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          interval={5000}
          transitionTime={1000}
        >
          <div className="banner-item1">
            <img src={Banner4} />
          </div>
          <div className="banner-item2">
            <img src={Banner2} />
          </div>
          <div className="banner-item3">
            <img src={"http://localhost:3000/image/BannerOversize1.jpg"} />
          </div>
          
          {/* <div className="banner-video1">
            <img  src={"http://localhost:3000/image/video3.webp"}  />
          </div> */}
        </Carousel>
      </div>

      <div className="main-carousel1">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          interval={5000}
          transitionTime={1000}
        >
          <div className="banner-item1">
            <img src={"http://localhost:3000/image/BannerOversize.jpg"} />
          </div>
          <div className="banner-item2">
            <img src={"http://localhost:3000/image/BannerGlam.jpg"} />
          </div>
          <div className="banner-item3">
            <img src={"http://localhost:3000/image/BannerRock.jpg"} />
          </div>
          
         {/*  <div className="banner-video1">
            <img  src={"http://localhost:3000/image/video3.webp"}  />
          </div> */}
        </Carousel>
      </div>

      <Carousel1
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="transform 1500ms ease-in-out"
        transitionDuration={1500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        arrows={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        showDots={false}
      >
        <div className="category-slides">
          <h4 className="category-title">GIRLFRIEND</h4>
          <img
            className="girlfriend-category"
            alt="girlfriend-category"
            src={GirlfriendIMG}
          />
        </div>
        <div className="category-slides">
          <h4 className="category-title">CULOTTE</h4>
          <img
            className="girlfriend-category"
            alt="girlfriend-category"
            src={CulotteIMG}
          />
        </div>
        <div className="category-slides">
          <h4 className="category-title">STRAIGHT</h4>
          <img
            className="girlfriend-category"
            alt="girlfriend-category"
            src={StraightIMG}
          />
        </div>
        <div className="category-slides">
          <h4 className="category-title">SKINNY</h4>
          <img
            className="girlfriend-category"
            alt="girlfriend-category"
            src={SkinnyIMG}
          />
        </div>
        <div className="category-slides">
          <h4 className="category-title">MOM</h4>
          <img
            className="girlfriend-category"
            alt="girlfriend-category"
            src={MomIMG}
          />
        </div>
      </Carousel1>
      
      <br></br>

      {/* <img id="image-test"   src={"http://localhost:3000/image/video3.webp"}  /> */}

      <br></br>
      <img className="beneficios" src={Beneficios}/>

     
      <h1 className="lo-nuevo-titulo">Lo Nuevo</h1>
      <Shop />
      
      
      <br></br>

      <div className="confirmation-content-section">

                <form className="newsletter-form">
                    <h2>Newsletter</h2>
                    <span>Nombre</span>
                    <input name="nombre"  type="text" id="nombre" ref={nombreRef} required/>
                    <span>Género</span>
                    <input name="genero"  type="text" id="genero" ref={generoRef} required/>
                    <span>Email</span>
                    <input name="email"  type="text" id="email" ref={mailRef} required/>
                    <span>Teléfono</span>
                    <input name="telefono"  type="text" id="telefono" ref={telefonoRef} required/>
                    <br></br>
                    <button className="newsletter-form-button" type="submit"> SUSCRIBIRSE</button>
                    <br></br>
                    <span>Al suscribirte aceptas nuestras <a href="https://www.google.com">políticas de tratamiento de datos</a></span>
                </form>

                <div className="confirmation-content-section1">
                    <h2>¡ Beneficios de suscripción !</h2>
                    <h3>• Seguimiento a tus pedidos.</h3>
                    <h3>• Descuento Especiales.</h3>
                    <h3>• Acumula puntos con tus compras.</h3>
                </div>
      </div>
      <br></br>
      <br></br>

    
      
      
     <Footer/>
       
    </div>
    </CSSTransition>
  );
}
