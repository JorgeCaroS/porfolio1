const express = require('express');
const router = express.Router();
const Products = require('../models/producto');


/////Get products


router.get('/', async(req, res) =>{
    try{
        const productos = await Products.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.json(productos);
        console.log(productos); 
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
})

/////Get One product
router.get('/:id',getProductos,(req, res) => {
    res.send(res.productos.name);
  });

/////Create One product
/*
router.post('/', async(req, res) =>{
    const productos = new Products({
        ref:req.body.ref,
        name: req.body.name,
        url:req.body.url,
        tallas:req.body.tallas,
        images:req.body.images,
    })
    try{
        const newProducts = await productos.save();
        res.status(201).json(newProducts);

    }catch(err){
        res.status(400).json({err: err.message});
    }

})
*/

/////Update One product
router.patch('/:id',getProductos, async(req, res) =>{
    if(req.body.name != null){
        res.productos.name = req.body.name
    }
    if(req.body.ref != null){
        res.productos.ref = req.body.ref
    }
    try{
        const updatedProduct = await res.productos.save()
        res.json(updatedProduct)

    } catch(error){

        res.status(400).json({message: err.message})
    }
    

})



/////Delete One product
router.delete('/:id',getProductos, (req, res) =>{
    try{
        res.productos.remove().productos;
        res.json({message:"Producto Eliminado"})

    } catch(error){
        res.status(500).json({message: err.message})
    }

})
//////////////////////////////////

/*

router.post('/upload', async(req, res) =>{
    const productos = new Products({        
        name: req.body.name,
        file:req.body.file        
    })
    insertFile(file,res)
    try{
        const newProducts = await productos.save();
        res.status(201).json(newProducts);
        

    }catch(err){
        res.status(400).json({err: err.message});
    }

})
*/
/////////////////////////
/*
router.post("/upload", (req, res) => {
    let file = {name: req.body.name, file: binary(req.files.uploadedFile.data)}
    console.log("req"+req)
    insertFile(file,res)
})
*/
function insertFile(file, res){
    mongoClient.connect("mongodb+srv://devops:Contraseña123@cluster0.evlx3.mongodb.net/Test?retryWrites=true&w=majority",
    { useNewUrlParser: true }, (err, client) =>{
        if (err){
            return err
        }
        else{
            let db = client.db('Test')
            let collection = db.collection('products')
            try{
                collection.insertOne(file)
                console.log("File Inserted")
            }catch(err){
                console.log("Error while inserting", err)
            }
            client.close()
            res.redirect('/')
        }
    })
}

            

//////////////////////////////////


///////

async function getProductos(req, res, next) {
    let productos
  try {
    productos = await Products.findById(req.params.id);
    if (productos == null) {
      return res.status(404).json({ message: "No se encontró el producto" });
    }
  } catch (err) {
      return res.status(500).json({message: err.message})
  }
  res.productos = productos;
  next();
}

module.exports = router;

