const express = require("express");
const app = express();
const mongoose = require("mongoose");


mongoose.connect(
  "mongodb+srv://devops:Contraseña123@cluster0.evlx3.mongodb.net/Test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => { 
  console.log("Connected to database");
});

//////////////////////////////
app.use(express.json());

const productosRouter = require("../routes/productos");
app.use("/api/productos", productosRouter);

app.listen(3000, () => console.log("Server Started"));



