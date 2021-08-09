import MainHeader from "./MainHeader";
import { MyContext } from "../context/MyContext";
import React,{ useState, useEffect, useRef, useContext } from "react";
import Cart from "./Cart";
import { CSSTransition } from 'react-transition-group';

export default function Confirmation() {

    const { cartClassName, setCartClassName } = useContext(MyContext);
    let nombreRef = React.createRef();
    let generoRef = React.createRef();
    let mailRef = React.createRef();
    let telefonoRef = React.createRef();

    return (
        <CSSTransition
    in={true}
    appear={true}
    timeout={600}
    classNames="fade"
  >
        <div className="confirmation-container">
            <MainHeader />
            <div className="confirmation-content">
                <h1 className="confirmation-title1">Gracias por tu compra</h1>
                <h1 className="confirmation-title2">Continua con tu proceso de pago en la nueva ventana</h1>
               

                <h2>¡ Suscríbete a nuestro newsletter y recibe ofertas especiales !</h2>

                <div className="confirmation-content-section">

                <form className="newsletter-form">
                    <h2>Newsletter</h2>
                    <span>Nombre</span>
                    <input name="nombre"  type="text" id="nombre" ref={nombreRef} required/>
                    <span>Genero</span>
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
                
            </div>

            

            <div className="cart-wrap">
                 <Cart cartClassName={cartClassName} />
            </div>
        </div>
        </CSSTransition>
    )
}