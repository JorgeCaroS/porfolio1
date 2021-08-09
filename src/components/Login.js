import React, {  useState,useContext, useEffect } from "react";
import Logo from "../Logo.png";
import MainHeader from "./MainHeader";
import Cart from "./Cart";
import { MyContext } from "../context/MyContext";
import GoogleLogin from 'react-google-login';


export default function Login() {

    const {cartClassName, setCartClassName} = useContext(MyContext); 
    const {user, setUser} = useContext(MyContext); 
    const [loginClassName, setLoginClassName] = useState("hidden"); 
    const [forgotClassName, setForgotClassName] = useState("hidden");
    const [forgotTrueClassName, setForgotTrueClassName] = useState("hidden");  
    const [regClassName, setRegClassName] = useState("hidden"); 
    const [regTrueClassName, setTrueRegClassName] = useState("hidden"); 
    const [loading1, setLoading1] = useState(true); 
    
    var googleID = "262215863399-1696movl6751f0imnlrmqdc9gnd6179g.apps.googleusercontent.com";
    var googleSecret = "2gBfn57iblJCVFjQ5s58PdY3";
    
    let mailRef = React.createRef();
    let passwordRef = React.createRef();
    let mail1Ref = React.createRef();
    let password1Ref = React.createRef();

    useEffect(() => {
    },[user])

    /* useEffect(() => {
        async function fetchData() {
          // setUser(history.location.state.user);
         
          const result = await fetch(
            "http://localhost:3000/api/users/" + user
          );
          var data = await result.json();
          //setUser(data);
          console.log(data);
          setLoading1(false);
         ;
        }
    
        fetchData();
      }, [loading1]); */

    function handleReg(e){
        console.log(e)
        e.preventDefault();
        fetch("http://localhost:3000/api/users/register", {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
            "Content-Type": "application/json",
            
          },         
          body: JSON.stringify({           
            mail: mailRef.current.value,
            password: passwordRef.current.value, 
          })
        }).then((response) => {         
          if (response.status === 201) {             
            setTrueRegClassName("forgot-true-error") 
            }else{            
              setRegClassName("forgot-error")
            };
      }); 
    }

   /*  async function handleLog(e){        
      e.preventDefault();
      var myUser = user;
      await fetch("http://localhost:3000/api/users/jorgecaro.ing@gmail.com", {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",           
          "secret-key": "naranka2021devops",
         "Content-Type": "application/json",
        },       
      }).then((response) => {
          console.log(response)
      })
  }  */
   

     async function handleLog(e){ 
            
       e.preventDefault();
       var thisError;
       var myUser = user;   
       try{  
       const myFetch = await fetch("http://localhost:3000/api/users/login", {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",           
            "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
           "Content-Type": "application/json", 
          },    
         
          body: JSON.stringify({            
            mail: mail1Ref.current.value,
            password: password1Ref.current.value,            
          }),
        }).then(response => response.json()).then(json => myUser=json) }  catch(err){
          thisError = "error";
        }

        console.log(thisError)

        if(thisError === "error"){
          setLoginClassName("login-error")
        }else{
          localStorage.setItem("MyUser",JSON.stringify({mail:myUser.mail, rol:myUser.rol})); 
          setUser({mail:myUser.mail, rol:myUser.rol}); 
        }

               
    }  

    function handleLoginError(){
      setLoginClassName("hidden");
    }

    function handleForgotError(){
      setForgotClassName("hidden")
    }

    function handleForgotTrueError(){
      setForgotTrueClassName("hidden")
    }

    function handleRegError(){
      setRegClassName("hidden")
    }

    function handleRegTrueError(){
      setTrueRegClassName("hidden")
    }

    async function forgotPassword(e){
      console.log(mail1Ref.current.value);
       await fetch(
        "http://localhost:3000/api/users/forgotpassword/" + mail1Ref.current.value,
        {
          method: "put",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
          },
  
          body: JSON.stringify({
            mail: mail1Ref.current.value,            
          }),
        }
      ).then((response) => {
        if (response.status === 200) {  
          setForgotTrueClassName("forgot-true-error") 
          }else{            
            setForgotClassName("forgot-error")
          };
    }); 
  
    }

    const handleLogin = async googleData => {
      var thisError;
      try{  
       const res = await fetch("http://localhost:3000/api/users/loginGoogle", {
          method: "POST",
          body: JSON.stringify({
          mail: googleData.profileObj.email
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
        }
      })
      const data = await res.json();

      localStorage.setItem("MyUser",JSON.stringify({mail:data.mail, rol:data.rol})); 
      setUser({mail:data.mail, rol:data.rol}); } catch(err){
        thisError = "error";
        console.log(err)
      }

      
    }


    

  return (
    <div>
      <MainHeader />
      <div className="cart-wrap">
      <Cart cartClassName={cartClassName}/>
      </div>

      <div className="login-container">
        <div className={loginClassName}>        
          <h1>Fallo de autenticación</h1>
          <span onClick={handleLoginError} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        <div className={forgotClassName}>        
          <h1>El correo no está registrado</h1>
          <span onClick={handleForgotError} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        <div className={forgotTrueClassName}>        
          <h1>Se ha enviado una contraseña al correo registrado</h1>
          <span onClick={handleForgotTrueError} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        <div className={regClassName}>        
          <h1>Este correo ya se encuentra registrado</h1>
          <span onClick={handleRegError} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

        <div className={regTrueClassName}>        
          <h1>¡Se ha registrado exitosamente!</h1>
          <span onClick={handleRegTrueError} id="cart-icon3" class="material-icons md-dark">close</span> Cerrar
        </div>

         

        <div className="forms-container">

        
          <form className="register-form">
            <h1>Registrarse</h1>
            <span className="text">Correo</span>
            <input type="text" id="mail-register" ref={mailRef} />
            <span className="text">Contraseña</span>
            <input type="password" id="password-register" ref={passwordRef} />
            <button className="register-button" onClick={handleReg}> <p> Registrarse </p> </button>
            <br></br>
            
          </form>

          <form className="login-form">
            <h1>Login</h1>
            <span className="text">Correo</span>
            <input type="text" id="mail-login"ref={mail1Ref} />
            <span className="text">Contraseña</span>
            <input type="password" id="password-login" ref={password1Ref}/>
            <button className="login-button" onClick={handleLog}> <p> Iniciar Sesión  </p></button>
            <a className="forgot-password" onClick={forgotPassword}>¿Olvidó su contraseña?</a>
            <br></br>
            <GoogleLogin
            disabled={false}
            clientId={googleID}
            buttonText="Iniciar sesión con  Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
            />
            
          </form>
          
          <br></br>
          
         
          
        </div>
       
      </div>
    </div>
  );
}
