import crypto from "crypto-js";
import { MyContext } from "../context/MyContext";
import { useHistory} from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import MainHeader from "./MainHeader";
import Cart from "./Cart";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Logo from "../images/logokancan.png";
import moment from "moment";
import { CSSTransition } from 'react-transition-group';


export default function Checkout() {
  const history = useHistory();
  const { cart, setCart } = useContext(MyContext);
  const { cartClassName, setCartClassName } = useContext(MyContext);
  let direccionRef = React.createRef();
  let nombreRef = React.createRef();
  let mailRef = React.createRef();
  let telefonoRef = React.createRef();
  let cedulaRef = React.createRef();
  let wompiRef = React.createRef();
  let sisteRef = React.createRef();
  let politicaRef = React.createRef();
  const axios = require("axios");
  const [usuario, setUsuario] = useState({direccion:null, telefono:null, nombre:null, cedula:null});
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [departamentoClicked, setDepartamentoClicked] = useState([]);
  const [ciudadClicked, setCiudadClicked] = useState([]);
  const [ciudadesPorDepartamento, setCiudadesPorDepartamento] = useState([]);
  const [valorEnvio, setValorEnvio] = useState([]);
  const [envioGratis, setEnvioGratis] = useState([]);
  const [codigo, setCodigo] = useState([]);
  const [referenceCode, setReferenceCode] = useState();
  const [total1, setTotal1] = useState();
  const [cartChange, setCartChange] = useState(false);
  const [sistecreditoURL, setSistecreditoURL] = useState();  
  const [showConfirmation, setShowConfirmation] = useState(false);          
  const [loading1, setLoading1] = useState(false);
  const [payMethod, setPayMethod] = useState();
  const [politicaCheck, setPoliticaCheck] = useState(true);
  const [errorClassName, setErrorClassName] = useState("hidden");
  const [errorClassName1, setErrorClassName1] = useState("hidden");
  const [errorClassName2, setErrorClassName2] = useState("hidden");
  const [payButtonClassName, setPayButtonClassName] = useState("hidden");
  
  
  let ciudadRef = React.createRef();

  useEffect(() => {  
      setReferenceCode("kancan" + Date.now()); 
      fetchDepartamentos();
      fetchCiudades();
    if (cart) {
      var total = 0;
      for (var i = 0; i < cart.length; i++) {
        total = total + (cart[i].price - cart[i].price * cart[i].discount.value);
      }
      setTotal1(total)
      
      if (cart.length === 0) {
        return null;
      }
          
    } 
} 
,[cart.length])



useEffect(() => {  
  setCartChange(true)
  if(cartChange === true){    
    history.push({
      pathname: `/tienda`      
    });
  }
 
  setLoading1(true)
  setLoading1(false)
}
,[cart.length])

useEffect(() => {  
 
  if(showConfirmation === true){    
    history.push({
      pathname: `/confirmacion`      
    });
  }
 
  setLoading1(true)
  setLoading1(false)
}
,[showConfirmation])





  async function fetchDepartamentos(){     
    const result = await fetch(
      "http://localhost:3000/coordinadora/departamentos"
    );      
    var data = await result.json(); 
    data.SOAP.Cotizador_departamentosResult.item.shift();   
    setDepartamentos(data.SOAP.Cotizador_departamentosResult.item);
   // console.log(data.SOAP.Cotizador_departamentosResult.item);
    }


  async function fetchCiudades(){
    const result1 = await fetch(
      "http://localhost:3000/coordinadora/ciudades"
    );      
    var data1 = await result1.json();     
    setCiudades(data1.SOAP.Cotizador_ciudadesResult.item);
    //console.log(data1.SOAP.Cotizador_ciudadesResult.item); 
  }


  async function fetchCotizar(myCode){  
   
    setLoading1(true);  
    
    try{
      await fetch("http://localhost:3000/coordinadora/cotizar", {
        method: "post",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
          "Content-Type": "application/json",
          
        },         
        body: JSON.stringify({           
          destino: myCode,          
        })
      }).then(response => response.json())
      .then(json => setValorEnvio(json.SOAP.Cotizador_cotizarResult.flete_total.split("al>")));
    }catch(err){
      console.log(err);      
      setValorEnvio("Intenta otra ubicación");
      setErrorClassName2("checkout-error");
    }

     if(valorEnvio){
      setLoading1(false);
     }

     if (total1 > 200000){
       setValorEnvio([0,0])
       setLoading1(false);
     }
       
  }


  
  


  useEffect(() => {  
      fetchDepartamentos();
      fetchCiudades();
  }
  ,[ciudadesPorDepartamento])

  function handleDepartamento(e){
    if(nombreRef.current.value.length === 0 ||
       direccionRef.current.value.length === 0 ||
       telefonoRef.current.value.length === 0 ||
       mailRef.current.value.length === 0 ||
       cedulaRef.current.value.length === 0) {
      setErrorClassName1("checkout-error")
      return e.currentTarget.value = "Departamentos"
    }    
    setCiudadClicked("");
    ciudadRef.current.value = "";    
    var ciudadesPorDepartamento1=[];    
    console.log(e.currentTarget.value)
    setDepartamentoClicked(e.currentTarget.value)
    for(var i = 0 ; i < ciudades.length  ; i++){
      if(e.currentTarget.value === ciudades[i].nombre_departamento){
        ciudadesPorDepartamento1.push(ciudades[i])
      }
    }
    setCiudadesPorDepartamento(ciudadesPorDepartamento1);
    //console.log(ciudadesPorDepartamento1);
  }

  function handleCiudad(e){
    var myCode;
    console.log(e.currentTarget.value)
    for(var i = 0 ; i < ciudades.length  ; i++){
      if(e.currentTarget.value === ciudades[i].nombre){
        setCiudadClicked(ciudades[i].nombre);
        setCodigo(ciudades[i].codigo);
        myCode=ciudades[i].codigo;
      }
    }    
    setUsuario({direccion:direccionRef.current.value,
        telefono:telefonoRef.current.value,
        nombre:nombreRef.current.value,
        mail:mailRef.current.value,
        cedula:cedulaRef.current.value});
    console.log(myCode)   
    fetchCotizar(myCode);  
    
  }


 

  var myKey = crypto.MD5(
    "1fgYT1jebBYngNpKYJ9IuZwhd1~663558~TestPayU1~20000~COP"
  );
  var myAPI = "pub_test_JvohDqaePXFJm6PtXHAfr1ZMWX384d5p";

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  

 // console.log(myKey.toString());

 


  async function POPUPW() {    
      window.open("about:blank", "POPUPW", "width=800,height=600");  
      setCart([]); 
      setShowConfirmation(true);            
  }

  function abortPay(e){
   // console.log("abortPay")
    setErrorClassName("checkout-error")
    return e.preventDefault();
  }

  function abortPay2(e){
    //console.log("abortPay2")
    return e.preventDefault();
  }

  
  
  
   async function handlePay() {       
   // console.log(total1);
   // console.log(referenceCode)
     await fetch("http://localhost:3000/api/pedidos", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + btoa("devops2021*:devops2021*"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referencia: referenceCode,
        estado: "Indefinido",
        nombre: usuario.nombre,
        cedula: usuario.cedula,
        mail: usuario.mail,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        productos:cart,
        envio: valorEnvio[1],
        departamento: departamentoClicked,
        ciudad:ciudadClicked,
        total:total1,
        fecha:Date().toLocaleString(),
      }),
    });  

    if(politicaCheck === true){
      const res = await fetch("http://localhost:3000/api/treatmentusers/register", {
       method: "post",
       mode: "cors",
       headers: {
         Accept: "application/json",
         Authorization: "Basic " + btoa("devops2021*:devops2021*"),
         "Content-Type": "application/json",
       },
       body: JSON.stringify({        
         name: usuario.nombre,
         mail: usuario.mail,
         phone: usuario.telefono,
         address: usuario.direccion,         
         department: departamentoClicked,
         city:ciudadClicked,
         //fecha:Date().toLocaleString(),
       }),
     }); 
     const data = await res.json();   
     console.log(data); 
    }else{
      
    }

    
    
  }

  

  async function handlePaySistecredito() {      
      
     if(ciudadClicked.length === 0){
      return setErrorClassName("checkout-error")
    }
    
    const res = await fetch("https://api.credinet.co/paymentpublic/StartCredit", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        SCLocation: "0,0",
        country: "co",
        SCOrigen: "Staging",
        "Ocp-Apim-Subscription-Key":"42fee88913d34e3b8c2c5ae45847bc32",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idDocument: usuario.cedula,
        //idDocument: "10171361681",
        typeDocument: "CC",
        transactionDate: moment().format(),
        valueToPaid: valorEnvio[1] && total1 < 200000 ?  (parseInt(total1)+parseInt(valorEnvio[1])): valorEnvio[1] && total1 > 200000 ? (parseInt(total1)):total1,       
        vendorId: "60f096dd4fec8c0001414468",
        storeId: "60f096ddcb1a6000015698bd",
        orderId: referenceCode,
        responseUrl: "http://ec2-23-22-55-137.compute-1.amazonaws.com:3000/sistecredito"  
      }),
    });

    const data = await res.json();       
    window.open(data.data.urlToRedirect+"?transactionId="+data.data.transactionId,"width=548","height=325");    
  }

  function handleError(){
    setErrorClassName("hidden");
  }

  function handleError1(){
    setErrorClassName1("hidden");
  }

  function handleError2(){
    setErrorClassName2("hidden");
  }

  function handleCartItems(){
    console.log("handleCartItems")
    window.location.reload(false);
  }
  

  function handleCheckBox(e){    
    setPayMethod(e.target.defaultValue);
    setPayButtonClassName("payButton")
  }

  function handlePay2(){
    
    if(payMethod === "Wompi"){
      handlePay();
    }else{
      if(payMethod === "Sistecredito"){
        handlePaySistecredito();
      }
    }
  }

  console.log(politicaCheck)

  function handlePolitica(){     
    setPoliticaCheck(politicaRef.current.checked ) 
    console.log(politicaRef.current.checked ) 
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
          timeout={3000}
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
    <div id="checkout-container" className="checkout-container">
      
      <MainHeader />
      <div className="cart-wrap">
        <Cart cartClassName={cartClassName} />
      </div>
      <div className="checkout-section">
        <div className={errorClassName}>        
          <h1>Elige una ciudad de destino</h1>
          <span onClick={handleError} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        
        <div className={errorClassName1}>    
          <h2>Favor Diligencia</h2>    
          <h2>Nombre, Cédula, Email, Dirección y Teléfono</h2>
          <span onClick={handleError1} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        <div className={errorClassName2}>        
          <h1>Elige otra ubicación</h1>
          <span onClick={handleError2} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        <div  className="checkout-products-section">
        <div  className="checkout-products"></div>
        <h1>Tu compra</h1>
        

        <div className="cart-items">
          {cart.map((producto, index) => (
            <div key={Math.random(0, 1000)} className="cart-single-item">
              <div>
                <img className="cart-single-image" src={"http://localhost:3000/image/" + producto.reference +"_01.jpg"}/>
              </div>
              <div className="cart-single-item-desc">
                <div className="cart-single-desc">{producto.reference} </div>
                <div className="cart-single-desc">{producto.name} </div>
                <div className="cart-single-desc">Color {producto.color} </div>
                <div className="cart-single-desc">Talla {producto.size} </div>
                <div className="cart-single-desc-price">
                  {/*formatterPeso.format(producto.price)*/}
                  {formatterPeso.format(
                    producto.price - producto.price * producto.discount.value
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
          </div>
          <div className="checkout-ship-information">

          <div className="checkout-ship-information-data">
          <h1>Detalles de Envío</h1>
          <span>Dirección</span>
          <input placeholder="Dirección" type="text" name="direccion" required ref={direccionRef} value={usuario.direccion =! null ? usuario.direccion : ""}/>
          <span>Teléfono</span>
          <input placeholder="Teléfono" type="text" name="telefono" required ref={telefonoRef} value={usuario.telefono =! null ? usuario.telefono : ""}/> 
          <span>Nombre</span>
          <input placeholder="Nombre" type="text" name="nombre" required ref={nombreRef} value={usuario.nombre =! null ? usuario.nombre : ""}/> 
          <span>Cédula</span>
          <input placeholder="Cédula" type="text" name="cedula" required ref={cedulaRef} value={usuario.cedula =! null ? usuario.cedula : ""}/> 
          <span>Email</span>
          <input placeholder="Email" type="text" name="mail" required ref={mailRef} value={usuario.mail =! null ? usuario.mail : ""}/> 
          <div className="checkout-departamentos"> 
          <span>Selecciona un departamento</span>  
          <br></br>    

          

        <select className="checkout-select"   onChange={handleDepartamento}>
        <option hidden selected>
              {departamentoClicked.length > 0 ? departamentoClicked : "Departamentos"}
        </option>
        {departamentos.map((departamento) => (         
          <option value={departamento.nombre} id={departamento.nombre} >{departamento.nombre}</option>
           ))}    
        </select>         
        </div>
        <br></br>  
        
        <div className="checkout-ciudades">   
        <span>Selecciona una ciudad</span>   
        <br></br>        
        <select className="checkout-select" ref={ciudadRef} onChange={handleCiudad}>
        <option hidden selected>
        {ciudadClicked.length > 0 ? ciudadClicked : "Ciudades"}
        </option>
        {ciudadesPorDepartamento.map((ciudad) => ( 
          <option value={ciudad.nombre} id={ciudad.nombre} >{ciudad.nombre}</option>
           ))}    
        </select> 
        </div>

        <div className="checkout-politica">
        <input type="checkbox" id="cbox3" value="Politica"  ref={politicaRef} onClick={handlePolitica} defaultChecked></input>
        <label for="cbox3">Acepto las <a href="https://www.google.com">políticas de tratamiento de datos.</a></label>        
        </div>

        
        

         <div className="checkout-ship-value">
          <h3 >Costo de envío {ciudadClicked.length>0 ? "a "+ciudadClicked : null}</h3>          
          <h3>{valorEnvio === "Intenta otra ubicación" ? "Intenta otra ubicación" : valorEnvio[1] ? formatterPeso.format(valorEnvio[1])  : valorEnvio[1] === 0 ? <h3 className="checkout-warning">Tu envio es gratis!</h3>: <span className="checkout-warning-green">Elije tu ubicación para calcular el costo de envío</span> }</h3>
          </div> 
          <h3 onChange={handleCartItems} >{"Total Productos " + formatterPeso.format(total1)}</h3>
          <h2>{valorEnvio[1] ? "Total " +  formatterPeso.format(parseInt(total1)+parseInt(valorEnvio[1])): null }</h2>
          </div>


          <form
            type="hidden"
            action="https://checkout.wompi.co/p/" 
            method="GET"
            target="POPUPW"
            onSubmit={ciudadClicked.length>0 && payMethod === "Wompi" && valorEnvio != "Intenta otra ubicación" ? POPUPW : ciudadClicked.length>0 && payMethod === "Sistecredito" ? abortPay2 : abortPay}             
          >
            <input type="hidden" name="public-key" value={myAPI} />
            <input type="hidden" name="currency" value="COP" />
            <input type="hidden" name="amount-in-cents" value={valorEnvio[1] && total1 < 200000 ?  (parseInt(total1)+parseInt(valorEnvio[1])+"00"): valorEnvio[1] && total1 > 200000 ? (parseInt(total1)+"00"):null} />
            <input
              type="hidden"
              name="reference"
              value={referenceCode}
            />
            <input
              type="hidden"
              name="redirect-url"
              value="https://transaction-redirect.wompi.co/check"
            />
            <input type="hidden" name="tax-in-cents:vat" value="1000" />
            <input type="hidden" name="tax-in-cents:consumption" value="1000" />

            <div className="checkout-paycheck">
            <h1>Elige un método de pago </h1>
            

            <div className="checkout-paycheck-option">
            <input type="checkbox" id="cbox1" value="Wompi" onClick={handleCheckBox} ref={wompiRef} checked={payMethod === "Wompi"}></input>
            <label for="cbox1">Pago con Tarjeta o Transferencia</label>
            </div>

            <div className="checkout-paycheck-option">
            <input type="checkbox" id="cbox2" value="Sistecredito" onClick={handleCheckBox} ref={sisteRef} checked={payMethod === "Sistecredito"}></input>
            <label for="cbox2">Sistecredito</label>  
            </div>

            <button className={payButtonClassName} onClick={handlePay2} type="submit">
              Pagar
            </button>

            </div>
            
            
            
            {/* <button className="payButton" onClick={handlePay} type="submit">
              Pagar
            </button> */}
          </form>
          <br></br>

          
            
         
           {/*  <button className="payButton" onClick={handlePaySistecredito} type="submit">
            Sistecredito
          </button>  */}
          
          
        
        <br></br>
        
        </div>
      </div>
    </div>
    </CSSTransition>
  );
}
