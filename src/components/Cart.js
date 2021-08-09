import { MyContext } from "../context/MyContext";
import { useState, useEffect, useContext } from "react";
import { useHistory} from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(MyContext); 
  const { cartClassName, setCartClassName } = useContext(MyContext);
  const history = useHistory();

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  useEffect(async () => {}, []);

  function closeCart() {
    setCartClassName("cart-container-hidden");
  }

  function deleteItem(e) {
    var cartItems = [...cart];
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems.indexOf(cartItems[i]) == e.target.id) {       
        cartItems.splice(i, 1);
      }
    }
    setCart(cartItems);
    localStorage.setItem("MyCart",JSON.stringify(cartItems));
  }

  if(cart){
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
     total = total + (cart[i].price - (cart[i].price * cart[i].discount.value));
   } 
   if (cart.length === 0) {
    return null;
  } 
  }

  function handlePay(){
    setCartClassName("hidden")
    history.push({
      pathname: `/checkout`      
    });
  }
 

  

  return (
    <div className={cartClassName}>
      <div className="cart-menu">
        <h2 className="cart-title">Tu Carrito</h2>
        
        <span
          onClick={closeCart}
          id="cart-icon2"
          className="material-icons md-dark"
        >
          close
        </span>
      </div>
      <div className="cart-items">
      { cart.map((producto, index ) => (
        
        
        <div key={Math.random(0,1000)} className="cart-single-item">
          <div>
            <img
              className="cart-single-image"
              src={
                "http://localhost:3000/image/" + producto.reference + "_01.jpg"
              }
            />
          </div>
          <div className="cart-single-item-desc">
            <div className="cart-single-desc">Ref {producto.reference} </div>
            <div className="cart-single-desc">{producto.name} </div>
            <div className="cart-single-desc">Color {producto.color} </div>
            <div className="cart-single-desc">Talla {producto.size} </div>
            <div className="cart-single-desc-price">
              {/*formatterPeso.format(producto.price)*/}
              {formatterPeso.format(producto.price - producto.price *  producto.discount.value )}
             
            </div>
          </div>
          <div className="trash-icon">
          <span
            onClick={deleteItem}
            id={index}
            className="material-icons md-dark"
          >
            delete
          </span>
          </div>
        </div>
      ))}
      </div>
      <div className="buy-info">
        <h3 className="buy-info-title">Resumen de Compra</h3>
        <h2 className="buy-info-sum1">
          {total < 200000
            ? "Faltan " +
              formatterPeso.format(200000 - total) +
              " para envío gratis!"
            : <h2 className="buy-info-sum2"> ¡ Envío Gratis ! </h2>}
        </h2>
        <h2 className="buy-info-price"> Total {formatterPeso.format(total)}</h2>
        <div className="cart-bottom-buttons">
          <button onClick={closeCart} className="keep-buying-button">
            Seguir Comprando
          </button>
          <button onClick={handlePay} className="pay-button">Ir a Pagos</button>
        </div>
      </div>
    </div>
  );
}
