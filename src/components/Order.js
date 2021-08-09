import React, {  useState,useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import moment from "moment";

export default function Order() {
    
    const formatterPeso = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      });

    const {pedidos, setPedidos} = useContext(MyContext);
    const { orderSelected, setOrderSelected } = useContext(MyContext);  
    const { orderClassName, setOrderClassName } = useContext(MyContext);    
    const [referencia, setReferencia] = useState([]); 
    const [productos, setProductos] = useState([]); 
   // const currentRef = history.location.state.state.referencia;
   // console.log(history.location.state.state.referencia)
    console.log(pedidos)

     useEffect(() => {       
        for(var i = 0 ;  i < pedidos.length ; i++){            
              if(pedidos[i].referencia === orderSelected){
                setReferencia(pedidos[i]);
                console.log(pedidos[i])
                setProductos(pedidos[i].productos)                
             } 
        }           
    },[orderSelected]) 
 
    
  function handleClose(){
    setOrderClassName("hidden")
  }
    

    return(
        <div className={orderClassName}>          
            <div onClick={handleClose} className="order-close-button">
                <h3>Cerrar</h3>
            </div>
            <div className="order-left-section">
            <h1>Pedido</h1>
            <h3>Nombre: {referencia.nombre}</h3>
            <h3>Cedula: {referencia.cedula}</h3>
            <h3>Correo: {referencia.mail}</h3>
            <h3>Referencia de Pago: {referencia.referencia}</h3>
            <h3>Departamento: {referencia.departamento}</h3>
            <h3>Ciudad: {referencia.ciudad}</h3>
            <h3>Dirección: {referencia.direccion}</h3>
           {/*  <h3>Fecha: {referencia.fecha}</h3> */}
            <h3>Fecha: {referencia.fecha ? referencia.fecha.slice(0, -14).split("T")+" Hora "+moment(referencia.fecha).format("hh:mm a"): null}</h3>
            <h3>Teléfono: {referencia.telefono}</h3>
            </div>
            <div className="order-right-section">

              <div className="order-container">
              
            {productos.map((producto)=>(
                <div className="order-product">
                  <div className="order-details">
                    <p>Referencia: {producto.reference}</p>
                    <p>Talla: {producto.size}</p>
                    <p>Color: {producto.color}</p>
                    <p>Precio: {formatterPeso.format(producto.price - (producto.price * producto.discount.value))}</p>
                  </div>  
                  <div className="order-image-container">
                    <img className="order-image" src={"http://localhost:3000/image/"+producto.reference+"_01.jpg"}/>
                  </div>
                </div>
                
            ))}
            </div>
            
            <p>Envio {formatterPeso.format(referencia.envio)}</p>
            <p>Productos {formatterPeso.format(referencia.total)}</p>
            <h3>Total {formatterPeso.format(referencia.total +referencia.envio )}</h3>
            </div>
                       
        </div>
    )
}