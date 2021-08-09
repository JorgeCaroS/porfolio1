import { useHistory} from "react-router-dom";

export default function Footer() {

  const history = useHistory();


  function handleShops(){
    history.push({
      pathname: `/tiendas`      
    });

  }


  return (
    <div className="main-footer">
        
      <div className="footer-elements">
        <ul className="footer-list">         
          <h2>Somos Kancan</h2>
          <li onClick={handleShops}>Nuestras Tiendas</li>
          <li>Quiénes somos</li>
          <li>Ventas al por mayor</li>
        </ul>

        <ul className="footer-list">         
          <h2>Políticas</h2>
          <li>Cambios y devoluciones</li>
          <li>Avisos de privacidad</li>
          <li>Promociones y eventos</li>
        </ul>

        <ul className="footer-list">         
          <h2>Redes Sociales</h2>
          <li > <a href="https://www.facebook.com/kancanjeanscol/" target="blank">Facebook</a></li>
          <li><a href="https://www.instagram.com/kancanjeanscol/?hl=es" target="blank">Instagram </a></li>
          <li>Youtube</li>
        </ul>
      </div>

      <h1 className="footer-title">Kancan Jeans Colombia ®</h1> 

       
    
   
    </div>
  );
}
