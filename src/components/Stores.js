import React, { useState, useContext, useEffect } from "react";
import MainHeader from "./MainHeader";
import Cart from "./Cart";
import { MyContext } from "../context/MyContext";
import { CSSTransition } from 'react-transition-group';

export default function Shops() {
 
  const { cartClassName, setCartClassName } = useContext(MyContext);  
  const [ storeSelected, setStoreSelected ] = useState("");
  const [ openMap, setOpenMap ] = useState(true);


  const tiendas =  [{ciudad:"Cali",tienda:"Kancan CC Unicentro",direccion:"Cra 100 #5-169 Local 327 - 277", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.9020831025914!2d-76.54091458472409!3d3.374106352668206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a19643306de5%3A0x3e703ff09b32078c!2sKan%20Can%20Jeans%20Unicentro!5e0!3m2!1ses-419!2sco!4v1628093624309!5m2!1ses-419!2sco"},
  {ciudad:"Cali",tienda:"Kancan CC Palmetto",direccion:"Calle 9 #48-81 Local 179", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.742590912945!2d-76.54275068472424!3d3.412800352425694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6af9e426259%3A0x8c9f907f049f89f7!2sKan%20Can%20Jeans!5e0!3m2!1ses-419!2sco!4v1628093552167!5m2!1ses-419!2sco"},
  {ciudad:"Cali",tienda:"Kancan CC Cosmocentro",direccion:"Calle 5 # 50-103 Local 252", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.7289842977093!2d-76.55025378472428!3d3.4160811524050345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a79e2c8867a1%3A0x52b84e721333ac92!2sKan%20Can%20Jeans%20Cosmocentro!5e0!3m2!1ses-419!2sco!4v1628093810023!5m2!1ses-419!2sco"},
  {ciudad:"Cali",tienda:"Kancan CC Unico",direccion:"Calle 52 con Carrera 3 Local 1024", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7965.09766710288!2d-76.50282598072023!3d3.4592257794239467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a7cafcd49577%3A0x93e9aaae9a50f556!2sCentro%20Comercial%20%C3%9Anico%20Outlet!5e0!3m2!1ses-419!2sco!4v1628093886199!5m2!1ses-419!2sco"},
  {ciudad:"Cali",tienda:"Kancan Centro",direccion:"Calle 13 #6-82", telefono:"3154334626", horario1:"Lunes-Viernes : 9:00 AM - 7:00 PM" , horario2:"Sábados : 9:00 AM - 7:30 PM", horario3:"Domingos y Festivos : 9:00AM - 2:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4736.117789403115!2d-76.52837426010494!3d3.4507335741899126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a72430dd51cf%3A0xfa685f4d50a0a0de!2sKan%20Can%20Jeans%20Centro!5e0!3m2!1ses!2sco!4v1628106022912!5m2!1ses!2sco"},
  {ciudad:"Cali",tienda:"Kancan CC La 14 Calima",direccion:"Carrera 1 # 66-49 Local 135", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.4366584452796!2d-76.49629478472443!3d3.4858213519614694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a9fa09935ff5%3A0xcd705151a9897ea2!2sKan%20Can%20Jeans%20La%2014%20de%20Calima!5e0!3m2!1ses!2sco!4v1628106466053!5m2!1ses!2sco"},
  {ciudad:"Cali",tienda:"Kancan Salomia Outlet",direccion:"Carera 3 # 49-09", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.522696379715!2d-76.50445718472425!3d3.465440852091913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a7fbb8a7d205%3A0xf20e4d04e7382a56!2sKan%20Can%20Jeans!5e0!3m2!1ses!2sco!4v1628106994817!5m2!1ses!2sco"},
  {ciudad:"Cali",tienda:"Kancan CC Chipichape",direccion:"Carrera 38 Norte # 6N-45 Local 8-148", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.4783634658515!2d-76.5300055847243!3d3.4759572520247035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a70c86701f3b%3A0x8b071a61e6332d28!2sKan%20Can%20Jeans!5e0!3m2!1ses!2sco!4v1628107086290!5m2!1ses!2sco"},
  {ciudad:"Palmira",tienda:"Kancan Palmira Centro",direccion:"Carrera 27 # 31-02 Esquina", telefono:"3154334626", horario1:"Lunes-Viernes : 9:00 AM - 7:00 PM" , horario2:"Sábados : 9:00 AM - 7:30 PM", horario3:"Domingos y Festivos : 9:00AM - 2:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.2579059892632!2d-76.30004668472428!3d3.527787951690767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a7145f628b63%3A0x25715924fd68945a!2sKan%20Can%20Jeans%20Palmira%20Centro!5e0!3m2!1ses!2sco!4v1628110310053!5m2!1ses!2sco"},
  {ciudad:"Palmira",tienda:"Kancan CC Llanogrande",direccion:"Calle 31 # 44-239 Local 202", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15929.031165858172!2d-76.306612764968!3d3.5278146793981753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfc1204e618593a6a!2sKan%20Can%20Jeans!5e0!3m2!1ses!2sco!4v1628110492777!5m2!1ses!2sco"},
  {ciudad:"Palmira",tienda:"Kancan CC Unicentro Palmira",direccion:"Calle 42 # 39-68 Local 144", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15930.929335517858!2d-76.51369383022461!3d3.4152737999999974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a7292edf3ac1%3A0x793d94255f69da18!2sKan%20Can%20Jeans%20Unicentro%20Palmira!5e0!3m2!1ses!2sco!4v1628110699509!5m2!1ses!2sco"},
  {ciudad:"Buga",tienda:"Kancan Buga Centro",direccion:"Calle 7 # 13-02 Esquina", telefono:"3154334626", horario1:"Lunes-Viernes : 9:00 AM - 7:00 PM" , horario2:"Sábados : 9:00 AM - 7:30 PM", horario3:"Domingos y Festivos : 9:00AM - 2:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.579582201849!2d-76.30278658472471!3d3.8998799491649967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e39e704bdd714ff%3A0xcbe15d66fc13f42e!2sKan%20Can%20Jeans%20Buga!5e0!3m2!1ses-419!2sco!4v1628175608639!5m2!1ses-419!2sco"},
  {ciudad:"Tuluá",tienda:"Kancan Tulua Centro",direccion:"Calle 26 # 24- 05", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d509592.4589533979!2d-76.6447940484793!3d3.7685576743773486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e39c546e39ac7f3%3A0xde729bed298307ce!2sKan%20Can%20Jeans%20Tulu%C3%A1%20Centro!5e0!3m2!1ses-419!2sco!4v1628176201442!5m2!1ses-419!2sco"},
  {ciudad:"Tuluá",tienda:"Kancan CC La Herradura",direccion:"Carrera 19 # 28 - 76, local D01", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.6797962635756!2d-76.20077518472493!3d4.085455147821127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e39c57222a132e9%3A0x5dae000d311ea7b3!2sKan%20Can%20Jeans%20Tulu%C3%A1%20C.C%20Herradura!5e0!3m2!1ses-419!2sco!4v1628175858664!5m2!1ses-419!2sco"},
  {ciudad:"Cartago",tienda:"Kancan CC Nuestro Cartago",direccion:"Carrera 2 # 31-15, local 146", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15904.446082718046!2d-75.9279434164119!3d4.750655236508201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e387190bce1e2c1%3A0x8d13f06c0fadf4be!2sKan%20Can%20Jeans!5e0!3m2!1ses-419!2sco!4v1628176667262!5m2!1ses-419!2sco"},
  {ciudad:"Cartago",tienda:"Kancan Cartago Centro",direccion:"Carrera 4 # 10 - 97 ", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15904.44706677183!2d-75.92794341495767!3d4.750612578837734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e386f0a4be970ab%3A0xc89b9958b1c44fa2!2sKan%20Can%20Jeans%20Cartago!5e0!3m2!1ses-419!2sco!4v1628176609719!5m2!1ses-419!2sco"},
  {ciudad:"Pereira",tienda:"Kancan CC La Victoria",direccion:"Carrera 11 Bis # 17 - 20, local 109B", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.774592907055!2d-75.69278968472541!3d4.8087227420491425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3887ec0c78cde7%3A0xe0fb477c476986df!2sKan%20Can%20Jeans%20Pereira!5e0!3m2!1ses-419!2sco!4v1628177617809!5m2!1ses-419!2sco"},
  {ciudad:"Dosquebradas",tienda:"Kancan CC Unico Outlet",direccion:"Av. Simón Bolívar cra 16 con calle 24, local 8", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6686.243210362271!2d-75.67950626105547!3d4.82763101241279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388179e5bde8b7%3A0x45651c85833b4a02!2sKan%20Can%20jeans%20cc%20unico%20Dosquebradas!5e0!3m2!1ses-419!2sco!4v1628177692098!5m2!1ses-419!2sco"},
  {ciudad:"Armenia",tienda:"Kancan Cielos Abiertos",direccion:"Carrera 14 # 16-53 ", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.16620563930996!2d-75.6713255587943!3d4.534533393779446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f5ac449c729b%3A0x5f464a9dfbc7a219!2zQXYuIEJvbMOtdmFyICMxNiwgQXJtZW5pYSwgUXVpbmTDrW8!5e0!3m2!1ses-419!2sco!4v1628178825026!5m2!1ses-419!2sco"},
  {ciudad:"Armenia",tienda:"Kancan Armenia Centro",direccion:"Calle 19 # 15-18, local 1 Centro ", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.936280200668!2d-75.672447941521!3d4.533945651343222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f5ac45e4a857%3A0x5fbf0c0d93fe7b91!2sKan%20Can%20Jeans!5e0!3m2!1ses-419!2sco!4v1628178216767!5m2!1ses-419!2sco"},
  {ciudad:"Popayán",tienda:"Kancan Popayán Centro",direccion:"Carrera 6 # 5-68 ", telefono:"3154334626", horario1:"Lunes-Viernes : 9:00 AM - 7:00 PM" , horario2:"Sábados : 9:00 AM - 7:30 PM", horario3:"Domingos y Festivos : 9:00AM - 2:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5637.3411068204605!2d-76.60792810493008!3d2.439606879527725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30033d7e7b2c8d%3A0xcf6ba3bd95760ac!2sKan%20Can%20Jeans%20Popay%C3%A1n%20Centro!5e0!3m2!1ses-419!2sco!4v1628179446786!5m2!1ses-419!2sco"},
  {ciudad:"Popayán",tienda:"Kancan Castilla",direccion:"Calle 4 # 8-02, local 8-10", telefono:"3154334626", horario1:"Lunes-Viernes : 9:00 AM - 7:00 PM" , horario2:"Sábados : 9:00 AM - 7:30 PM", horario3:"Domingos y Festivos : 9:00AM - 2:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7972.4041591636005!2d-76.60792810511238!3d2.439622031551008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30031bfb5754d7%3A0x210acba7fe328340!2sKan%20Can%20Jeans%20Popay%C3%A1n!5e0!3m2!1ses-419!2sco!4v1628179566836!5m2!1ses-419!2sco"},
  {ciudad:"Popayán",tienda:"Kancan CC Campanario",direccion:"Carrera 9 # 29N -21, local 57", telefono:"3154334626", horario1:"Lunes-Viernes : 10:00 AM - 8:00 PM" , horario2:"Sábados : 10:00 AM - 9:00 PM", horario3:"Domingos y Festivos : 11:00AM - 8:00 PM ", map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7972.283803118898!2d-76.59831966511231!3d2.4598402999999966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e300339a09eab57%3A0x944dbb3890d5eda6!2sKan%20Can%20Jeans!5e0!3m2!1ses-419!2sco!4v1628179606578!5m2!1ses-419!2sco"},
  
  ];

  const ciudades = tiendas.map((t) => (t.ciudad));
  const ciudadesLista = [...new Set(ciudades)];

  function handleStore1(e){
    
    for(var i = 0 ; i < tiendas.length ; i++ ){
      if(e.target.innerText === tiendas[i].tienda){
         setStoreSelected(tiendas[i])
       }
    }
    setOpenMap(!openMap);
  }


  function handleMap(){
    setOpenMap(!openMap);
  }

  

  return (
    <CSSTransition
    in={true}
    appear={true}
    timeout={600}
    classNames="fade"
  >
    <div>
      <div className="stores-container">
      
        <MainHeader />
        
        <div className="cart-wrap">
          <Cart cartClassName={cartClassName} />
        </div>
        
        <h1 className="stores-title"> Nuestras Tiendas </h1>
        <div className="stores-content">
        
        
          <div className="stores-list-container">
          
          <div className="stores-map">
          {/* <iframe
            src="https://www.google.com/maps/d/embed?mid=1Sr98xym_52X2SZsi4vIYIZ4Lb4vHd_ZH"
            width="640"
            height="480"
          ></iframe> */}
          </div>
        
          
          <div className="stores-list">
            {ciudadesLista.map((c) =>(
              <div>
                 <h1>{c}</h1>                 
                   {tiendas.filter(function (tienda){
                   return tienda.ciudad === c;
                 }).map(function (tienda){                                  
                   return <div className={storeSelected.tienda === tienda.tienda ? "stores-list-item1" : "stores-list-item"} onClick={handleStore1}> {tienda.tienda}</div>                    
                 })}
             </div>
            ))}
           
          <br></br>
          </div>
          


          </div> 
          <div className= "store-details-desktop" >           
              <h2>{storeSelected ? storeSelected.tienda : "Selecciona una tienda para ver la información"}</h2>
              <div className="store-details-data">

                <div className="store-details-data-block"  id="direccion">
                <h3>Dirección <span className="material-icons md-dark">location_on</span></h3>
                <span> {storeSelected ? storeSelected.direccion : null}</span>
                </div>

                <div className="store-details-data-block" id="telefono">
                <h3>Teléfono <span className="material-icons md-dark">phone</span></h3> 
                <span> {storeSelected ? storeSelected.telefono : null}</span>
                </div>
                
                <div className="store-details-data-block"  id="horario">
                <h3>Horarios de Atención <span className="material-icons md-dark">schedule</span></h3> 
                <span> {storeSelected ? storeSelected.horario1 : null}</span>
                <span> {storeSelected ? storeSelected.horario2 : null}</span>
                <span> {storeSelected ? storeSelected.horario3 : null}</span>
                </div>

              </div>
              <br></br>
              <iframe className="store-map"src={storeSelected ? storeSelected.map : "http://localhost:3000/image/Portada1.jpg"} width="90%" height="70%" />            
              <br></br>
             
          </div>
          <div className={openMap ? "store-details-mobile" : "store-details-mobile-hidden"} >           
              <h2>{storeSelected ? storeSelected.tienda : "Selecciona una tienda para ver la información"}</h2>
              <div className="store-details-data">

                <div className="store-details-data-block"  id="direccion">
                <h3>Dirección <span className="material-icons md-dark">location_on</span></h3>
                <span> {storeSelected ? storeSelected.direccion : null}</span>
                </div>

                <div className="store-details-data-block" id="telefono">
                <h3>Teléfono <span className="material-icons md-dark">phone</span></h3> 
                <span> {storeSelected ? storeSelected.telefono : null}</span>
                </div>
                
                <div className="store-details-data-block"  id="horario">
                <h3>Horarios de Atención <span className="material-icons md-dark">schedule</span></h3> 
                <span> {storeSelected ? storeSelected.horario1 : null}</span>
                <span> {storeSelected ? storeSelected.horario2 : null}</span>
                <span> {storeSelected ? storeSelected.horario3 : null}</span>
                </div>

              </div>
              <br></br>
              <iframe className="store-map"src={storeSelected ? storeSelected.map : "http://localhost:3000/image/Portada1.jpg"} width="90%" height="70%" />            
              <br></br>
              <button className="store-map-close" onClick={handleMap}>Cerrar</button>
          </div>
          <br></br>

          
        </div>
      </div>
    </div>
    </CSSTransition>
  );
 
}
