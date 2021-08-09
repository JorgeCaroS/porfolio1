import React from "react";
import { useState, useEffect, createContext, useContext, useRef } from "react";
//import "../App.css";
import "../index.css";
import { BrowserRouter, Route, Redirect, Switch, useLocation} from "react-router-dom";
import Home from "./Home";
import Preview from "./Preview";
import CrearProducto from "./CrearProducto";
import Checkout from "./Checkout";
import Shop from "./Shop";
import Cart from "./Cart";
import Account from "./Account";
import Login from "./Login";
import Stores from "./Stores";
import Order from "./Order";
import Confirmation from "./Confirmation";
import SizeGuide from "./SizeGuide";
import { MyContext } from "../context/MyContext";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


export default function App() {

 
  //const [cart, setCart] = useState(JSON.parse(localStorage.getItem('MyCart')));
  //console.log(localStorage.getItem("MyCart"));

  const [cart, setCart] = useState([]);
  const [cartClassName, setCartClassName] = useState("cart-container-hidden");
  const [sizeGuideClassName, setSizeGuideClassName] = useState("hidden");
  const [classNamePopup, setClassNamePopup] = useState("hidden");
  const [orderClassName, setOrderClassName] = useState("hidden");
  const [products, setProducts] = useState([]);
  const [productsForFilter, setProductsForFilter] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productSelected, setProductSelected] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubCategorias] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colores, setColores] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subcategoryFilter, setSubcategoryFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [user, setUser] = useState(null);
  const [loading1, setLoading1] = useState(true);



  useEffect(() => {
    if (localStorage.getItem("MyCart")) {
      setCart(JSON.parse(localStorage.getItem("MyCart")));
    }

    if (localStorage.getItem("MyUser")) {
      setUser(JSON.parse(localStorage.getItem("MyUser")));
    }

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
                data.splice(i,1)
              }
            }
          }
        }
      }

      setProducts(data);
      setProductsForFilter(data);
      //console.log(data)

      setCategorias(data.map((producto) => producto.category));
      setSubCategorias(data.map((producto) => producto.subcategory));
      // var tallasPruebas = data.map((producto) => producto.skus.map((producto) => producto.size));
      var tallasPruebas = data.map((producto) => producto);
      var tallasConvencionales = [];
      var thisSize;
      for (var i = 0; i < tallasPruebas.length; i++) {
    
        if (tallasPruebas[i].article === "bottom") {
          for (var j = 0; j < tallasPruebas[i].skus.length; j++) {
            //console.log(tallasPruebas[i][j])
            switch (tallasPruebas[i].skus[j].size) {
              case "1":
                thisSize = "6";
                break;
              case "3":
                thisSize = "8";
                break;
              case "5":
                thisSize = "10";
                break;
              case "7":
                thisSize = "12";
                break;
              case "9":
                thisSize = "14";
                break;
              case "11":
                thisSize = "16";
                break;

              default:
                thisSize = "0";
            }
            tallasConvencionales.push(thisSize);
            // console.log(thisSize)
          }
        } else {
          if (tallasPruebas[i].article === "top") {
            for (var j = 0; j < tallasPruebas[i].skus.length; j++) {
              //console.log(tallasPruebas[i][j])
              switch (tallasPruebas[i].skus[j].size) {
                case "1":
                  thisSize = "XS";
                  break;
                case "3":
                  thisSize = "S";
                  break;
                case "5":
                  thisSize = "M";
                  break;
                case "7":
                  thisSize = "L";
                  break;
                case "9":
                  thisSize = "XL";
                  break;

                default:
                  thisSize = "0";
              }
              tallasConvencionales.push(thisSize);
              // console.log(thisSize)
            }
          }
        }

        // console.log(tallasPruebas[i])
      }
      setSizes(tallasConvencionales);
      

      /* setSizes(
        data.map((producto) => producto.skus.map((producto) => producto.size))
      );*/
      setColores(
        data.map((producto) => producto.skus.map((producto) => producto.color))
      );

      setLoading1(false);
    }
    fetchData();
    test();
  }, [loading1]);

  function test() {
    var categories = [...new Set(categorias)];
    var subcategories = [...new Set(subcategorias)];
    var sizes1 = [...new Set(sizes)];
    var colores1 = [...new Set(colores)];
    
    setCategoryFilter(categories);
    setSubcategoryFilter(subcategories);

    var myArray = [];
    var i;
    for (i = 0; i < sizes1.length; i++) {
      
      myArray.push(...sizes1[i]);
    }

    var myArrayColors = [];
    for (i = 0; i < colores1.length; i++) {
      myArrayColors.push(...colores1[i]);
    }
    var colors2 = [...new Set(myArrayColors)];
    setColorFilter(colors2);
    var sizes2 = [...new Set(myArray)];
    // var sizes2 = [...new Set(tallasConvencionales)];
    sizes1.sort(function (a, b) {
      return a - b;
    });
    setSizeFilter(sizes1);

 
  }

  

  return (
    <MyContext.Provider
      value={{
        cart,setCart,
        cartClassName,setCartClassName,
        orderClassName,setOrderClassName,
        classNamePopup,setClassNamePopup,
        sizeGuideClassName,setSizeGuideClassName,
        products,setProducts,
        productsForFilter,setProductsForFilter,
        pedidos,setPedidos,
        productSelected,setProductSelected,
        orderSelected,setOrderSelected,
        categoryFilter,setCategoryFilter,
        subcategoryFilter,setSubcategoryFilter,
        sizeFilter,setSizeFilter,
        colorFilter,setColorFilter,
        user,setUser,
      }}
    >
      <BrowserRouter>
        <React.Fragment>
       
        
        
          <Route exact path="/">
            <Redirect to="/inicio" />
          </Route>

          <Route exact path="/inicio">
            <Home  />
          </Route>

          <Route exact path="/inicio/producto/:id">
            <Preview />
          </Route>

          <Route exact path="/crear">
            <CrearProducto />
          </Route>

          <Route exact path="/checkout">
            <Checkout />
          </Route>


         
          <Route exact path="/tienda">
            <Shop />
          </Route>
          

          <Route exact path="/carrito">
            <Cart />
          </Route>

          <Route exact path="/tiendas">
            <Stores />
          </Route>

          <Route exact path="/pedido">
            <Order />
          </Route>

          <Route exact path="/confirmacion">
            <Confirmation />
          </Route>

          <Route
            exact
            path="/cuenta"
            render={() =>
              user ? <Route component={Account} /> : <Route component={Login} />
            }
          />

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/guia-tallas">
            <SizeGuide />
          </Route>

         
         
        </React.Fragment>
        
      </BrowserRouter>
    </MyContext.Provider>
  );
}
