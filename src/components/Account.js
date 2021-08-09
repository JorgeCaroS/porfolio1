import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import Cart from "./Cart";
import Order from "./Order";
import MainHeader from "./MainHeader";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import moment from "moment";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Logo from "../images/logokancan.png";
import { CSSTransition } from 'react-transition-group';

export default function Account() {
  const { user, setUser } = useContext(MyContext);
  const [userData, setUserData] = useState([]);
  const { cartClassName, setCartClassName } = useContext(MyContext);
  const { orderSelected, setOrderSelected } = useContext(MyContext);
  const [updateClassName, setUpdateClassName] = useState("hidden");
  const { orderClassName, setOrderClassName } = useContext(MyContext);  
  const [menuSelected, setMenuSelected] = useState([]);  
  const [loading1, setLoading1] = useState(true);
  const { pedidos, setPedidos } = useContext(MyContext);
  let passRef = React.createRef();
 
  

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  function sortDown(a, b) {
    
    const priceA = a.fecha;
    const priceB = b.fecha;

    let comparison = 0;
    if (priceA > priceB) {
      comparison = -1;
    } else if (priceA < priceB) {
      comparison = 1;
    }
    return comparison;
  }

  useEffect(async () => {
    setLoading1(false);
   /*  if (localStorage.getItem("MyUser")) {
      setUser(JSON.parse(localStorage.getItem("MyUser")));
    } */
   /*  async function fetchData() {
      const result = await fetch(
        "http://localhost:3000/api/users/" +
          JSON.parse(localStorage.getItem("MyUser")).mail,
        {
          method: "get",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("devops2021*:devops2021*"),
          },
        }
      );

      const data = await result.json();
      setUserData({
        name: data[0].user,
        mail: data[0].mail,
        address: data[0].address,
        phone: data[0].phone,
        points: data[0].points,
      });
      //setLoading1(false);
    }
    if (user) {
      fetchData();
    } */
  }, []);

  /* useEffect(async () => {
    if (user.rol === "admin") {
      async function fetchData1() {
        const result = await fetch("http://localhost:3000/api/pedidos/", {
          method: "get",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("devops2021*:devops2021*"),
          },
        });

        const data = await result.json();
        data.sort(sortDown);        
        setTimeout(function(){ setLoading1(false); }, 2000);
        console.log(data)      
        return setPedidos(data);
      }
      fetchData1();
    } else {      
      setLoading1(false);
    }
    
  }, []); */
  
  function logOut() {
    localStorage.removeItem("MyUser", JSON.stringify());
    setUser();
  }

  function handleMenu(e) {
    setMenuSelected(e.currentTarget.id);
    //console.log(Math.random().toString(36).slice(-8));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    console.log(e.target.form[1].value);
    console.log(e.target.form[4].value);
    await fetch(
      "http://localhost:3000/api/users/update/" + e.target.form[1].value,
      {
        method: "put",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("devops2021*:devops2021*"),
        },

        body: JSON.stringify({
          name: e.target.form[0].value,
          mail: e.target.form[1].value,          
          address: e.target.form[2].value,
          phone: e.target.form[3].value,
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        setUpdateClassName("update-confirmation");
      } else {
        setUpdateClassName("forgot-error");
      }
    });
  }

  async function updatePassword() {
    
    
     await fetch(
      "http://localhost:3000/api/users/updatePassword/" + user.mail,
      {
        method: "put",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("devops2021*:devops2021*"),
        },

        body: JSON.stringify({         
          mail: user.mail,          
          password: passRef.current.value,          
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        setUpdateClassName("update-confirmation");
      } else {
        setUpdateClassName("forgot-error");
      }
    }); 
  }

  function handleUpdateError() {
    setUpdateClassName("hidden");
  }

  const Styles = styled.div`
    table {
      width: 100%;

      border: 1px solid black;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
      th,
      td {
        margin: 0;
        padding: 5px;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        :last-child {
          border-right: 0;
        }
      }
    }
  `;

  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    );

    // Render Data Table UI
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Página{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Ir a Página:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "30px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize} Pedidos
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  function handlePedido(e) {
    console.log(e.currentTarget.id);
    setOrderSelected(e.currentTarget.id)
    setOrderClassName("order-classname")
  }

  const columns = [
    {
      Header: "Referencia",
      accessor: "referencia",
      Cell: (props) => (
        <div
          className="referencia-pedido"
          id={props.value}
          onClick={handlePedido}
        >
          {" "}
          {props.value.toLowerCase()}{" "}
        </div>
      ),
    },
    {
      Header: "Nombre",
      accessor: "nombre",
      Cell: (props) => <div> {props.value.toUpperCase()} </div>,
    },
    {
      Header: "Correo",
      accessor: "mail",
      Cell: (props) => <div> {props.value} </div>,
    },
    {
      Header: "Fecha",
      accessor: "fecha",
      Cell: (props) => (
        <div>
          {" "}
          {"Fecha: " +
            props.value.slice(0, -14).split("T") +
            " Hora: " +
            moment(props.value).format("hh:mm a")}{" "}
        </div>
      ),
    },
    {
      Header: "Transaccion",
      accessor: "estado",
      Cell: (props) => (
        <div>
          {" "}
          {props.value === "APPROVED" ? (
            <div className="green-cell">{props.value}</div>
          ) : props.value === "Indefinido" ? (
            <div className="blue-cell">{props.value}</div>
          ) : (
            <div className="red-cell">{props.value}</div>
          )}{" "}
        </div>
      ),
    },
    {
      Header: "Total Productos",
      accessor: "total",
      Cell: (props) => <div> {formatterPeso.format(props.value)} </div>,
    },

    {
      Header: "Costo Envio",
      accessor: "envio",
      Cell: (props) => <div> {formatterPeso.format(props.value)} </div>,
      
    },

    {
      Header: "Total",
      accessor: row => formatterPeso.format([row.total, row.envio].reduce((sum, current)=> sum + current,0)),
      
    },
  ];


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
    <div>
      <MainHeader />

      <div className="cart-wrap">
        <Cart cartClassName={cartClassName} />
      </div>

      <Order/>      

      <div className="account-container">
        <div className={updateClassName}>
          <h1>Datos guardados</h1>
          <span
            onClick={handleUpdateError}
            id="cart-icon3"
            className="material-icons md-dark"
          >
            close
          </span>{" "}
          Cerrar
        </div>

        <div className="account-menu">
          <div>
            ¡ Bienvenido! <h2>{user.mail} </h2>
          </div>
          <button className="logout-button" onClick={logOut}>
            {" "}
            Cerrar Sesión{" "}
          </button>
          <h4 className="account-points">
            Tienes {userData.points} Puntos Kancan!
          </h4>

          <div className="account-menu-options">
            <div
              className="account-menu-item"
              id="Mi Perfil"
              onClick={handleMenu}
            >
              {" "}
              Mi Perfil{" "}
            </div>
            <div
              className="account-menu-item"
              id="Mis Pedidos"
              onClick={handleMenu}
            >
              {" "}
              Mis Pedidos{" "}
            </div>
            <div
              className="account-menu-item"
              id="Rastrea tu pedido"
              onClick={handleMenu}
            >
              {" "}
              Rastrea tu pedido{" "}
            </div>

            {user.rol === "admin" ? (
              <div
                className="account-menu-title"                  
              >
                {" "}
                Panel de Administrador{" "}
              </div>
            ) : null}
          
            {user.rol === "admin" ? (
              <div
                className="account-menu-item"
                id="Gestion Pedidos"
                onClick={handleMenu}
              >
                {" "}
                Gestión de Pedidos{" "}
              </div>
            ) : null}
          </div>

           {user.rol === "admin" ? (
              <div
                className="account-menu-item"
                id="Gestion Usuarios"
                onClick={handleMenu}
              >
                {" "}
                Gestión de Usuarios{" "}
              </div>
            ) : null} 

            {user.rol === "admin" ? (
              <div
                className="account-menu-item"
                id="Gestion Informes"
                onClick={handleMenu}
              >
                {" "}
                Gestión de Informes{" "}
              </div>
            ) : null} 
            
              
          
        </div>
        <br></br>
        

        {menuSelected === "Mi Perfil" ? (
          <div className="account-section">
            <h2>{menuSelected}</h2>
            <div className="account-form">
              <form>
                <span>Nombre </span>
                <input
                  type="text"
                  id="account-name"
                  defaultValue={userData.name || ""}
                />
                <span>Mail </span>
                <input
                  type="text"
                  id="account-email"
                  readOnly={true}
                  defaultValue={userData.mail || ""}
                />
                <span>Dirección </span>
                <input
                  type="text"
                  id="account-address"
                  defaultValue={userData.address || ""}
                />
                <span>Teléfono </span>
                <input
                  type="text"
                  id="account-phone"
                  defaultValue={userData.phone || ""}
                />
                
                <button className="logout-button" onClick={handleUpdate}>
                  Editar Datos
                </button>
              </form>
              <h3>Nueva Contraseña </h3>
                <input type="password" id="account-password" defaultValue={""} ref={passRef}/>
                <button className="logout-button" onClick={updatePassword}>Guardar Contraseña</button>
            </div>
          </div>
        ) : menuSelected === "Mis Pedidos" ? (
          <div className="account-section">
            <h2>{menuSelected}</h2>
            <div className="account-form">
              <h1>Mis Pedidos</h1>
            </div>
          </div>
        ) : menuSelected === "Gestion Pedidos" ? (
          <div className="account-section">
            <h2>{menuSelected}</h2>
            <div className="account-form">
              <div className="account-table">
                <Styles>
                  <Table data={pedidos} columns={columns} />
                </Styles>
              </div>
            </div>
          </div>
        ) :  menuSelected === "Gestion Usuarios" ? (
          <div className="account-section">
            <h2>{menuSelected}</h2>
            <div className="account-form">
              <h1>Gestión de Usuarios</h1>
            </div>
          </div>
        ):
          menuSelected === "Gestion Informes" ? (
          <div className="account-section">
            <h2>{menuSelected}</h2>
            <div className="account-form">
              <h1>Gestión de Informes</h1>
            </div>
          </div>
        ):""}
      </div>
    </div>
    </CSSTransition>
  );
  
}
