import { useState, useEffect } from "react";
import "../index.css";
import { useHistory } from "react-router-dom";
import Product from "./Product";
import Fade from "react-reveal/Fade";


export default function Home({ name, url, cantidad, tallas }) {
  let productosTest = [
    {
      id: 10306,
      name: "19728 Falda Corta",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-51.jpg",
      variaciones: [
        { talla: 1, cantidad: 3 },
        { talla: 3, cantidad: 5 },
        { talla: 5, cantidad: 2 },
        { talla: 7, cantidad: 4 },
        { talla: 9, cantidad: 8 },
        { talla: 11, cantidad: 10 },
      ],
      images: [
        {
          image1:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-51.jpg",
        },
        {
          image2:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/02-50.jpg",
        },
        {
          image3:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/03-50.jpg",
        },
        {
          image4:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/03-51.jpg",
        },
      ],
    },
    {
      id: 10307,
      name: "19729 Falda Larga",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/22128-01-1.jpg",
      variaciones: [
        { talla: 1, cantidad: 5 },
        { talla: 3, cantidad: 4 },
        { talla: 5, cantidad: 1 },
        { talla: 7, cantidad: 1 },
        { talla: 9, cantidad: 3 },
        { talla: 11, cantidad: 3 },
      ],
      images: [
        {
          image1:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/22128-01-1.jpg",
        },
        {
          image2:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/22128-02.jpg",
        },
        {
          image3:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/22128-03.jpg",
        },
        {
          image4:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/22128-04.jpg",
        },
      ],
    },
    {
      id: 10308,
      name: "19730 Jeans Skinny",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-14.jpg",
      variaciones: [
        { talla: 1, cantidad: 3 },
        { talla: 3, cantidad: 5 },
        { talla: 5, cantidad: 2 },
        { talla: 7, cantidad: 4 },
        { talla: 9, cantidad: 8 },
        { talla: 11, cantidad: 5 },
      ],
      images: [
        {
          image1:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-14.jpg",
        },
        {
          image2:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/02-14.jpg",
        },
        {
          image3:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/03-14.jpg",
        },
        {
          image4:
            "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/04-14.jpg",
        },
      ],
    },
    {
      id: 10309,
      name: "19731 Jeans Tiro Alto",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-17.jpg",
      variaciones: [
        { talla: 1, cantidad: 3 },
        { talla: 3, cantidad: 5 },
        { talla: 5, cantidad: 2 },
        { talla: 7, cantidad: 4 },
        { talla: 9, cantidad: 8 },
        { talla: 11, cantidad: 1 },
      ],
    },
    {
      id: 10310,
      name: "19728 Falda Corta",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-51.jpg",
      variaciones: [
        { talla: 1, cantidad: 3 },
        { talla: 3, cantidad: 5 },
        { talla: 5, cantidad: 2 },
        { talla: 7, cantidad: 4 },
        { talla: 9, cantidad: 8 },
        { talla: 11, cantidad: 10 },
      ],
    },
    {
      id: 10311,
      name: "19729 Falda Larga",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/22128-01-1.jpg",
      variaciones: [
        { talla: 1, cantidad: 5 },
        { talla: 3, cantidad: 4 },
        { talla: 5, cantidad: 1 },
        { talla: 7, cantidad: 1 },
        { talla: 9, cantidad: 3 },
        { talla: 11, cantidad: 3 },
      ],
    },
    {
      id: 10312,
      name: "19730 Jeans Skinny",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-14.jpg",
      variaciones: [
        { talla: 1, cantidad: 3 },
        { talla: 3, cantidad: 5 },
        { talla: 5, cantidad: 2 },
        { talla: 7, cantidad: 4 },
        { talla: 9, cantidad: 8 },
        { talla: 11, cantidad: 5 },
      ],
    },
    {
      id: 10313,
      name: "19731 Jeans Tiro Alto",
      url:
        "https://kancanjeanscolombia.com/S/wp-content/uploads/2020/12/01-17.jpg",
      variaciones: [
        { talla: 1, cantidad: 3 },
        { talla: 3, cantidad: 5 },
        { talla: 5, cantidad: 2 },
        { talla: 7, cantidad: 4 },
        { talla: 9, cantidad: 8 },
        { talla: 11, cantidad: 1 },
      ],
    },
  ];

  const history = useHistory();
  const [productSelected, setSelected] = useState();
  const [clicked, setClicked] = useState();
  const [currentURL, setURL] = useState();
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  function handleClick(id, url, tallas, images) {
    setClicked({ id });
    setURL({ url });
    history.push({
      pathname: `/Home/${id}`,
      state: { url: url, tallas: tallas, images: images },
    });
  }

  useEffect(async () => {
    const result = await fetch("http://localhost:3000/api/productos/");
    const data = await result.json();
    setProductos(data);
    setLoading(false);
  }, []);

  console.log(productos);

  return (
    <div className="App">
      <header className="Header">
        <img
          src={"../Logo.png"}
          className="logoHeader"
          alt="logoHeader"
          width="120px"
        />
      </header>

      {
        <div className="Galeria">
          {productos.map((producto) => (
            <Product
              key={producto._id}
              source={producto.image}
              clicked={handleClick}
              name={producto.ref}
              url={producto.url}
              tallas={producto.tallas}
              images={producto.images}
              cantidad={producto.tallas.reduce(
                (sum, { cantidad }) => sum + cantidad,
                0
              )}
            />
          ))}
        </div>
      }
    </div>
  );
}
