const express = require("express");
const cartManager = require("../CartManager");
const productManager = require("../ProductManager");

const { Router } = express;

const router = new Router();

//POST CREAR CARRITO
router.post("/", (req, res) => {
  const instanciaCartManager = new cartManager("./carrito.json");
  instanciaCartManager
    .addCart()
    .then((estado) => {
      res.send(estado);
    })
    .catch((err) => {
      res.send(`${err}`);
    });
});

//GET CARRITO POR ID
router.get("/:cid", (req, res) => {
  let cid = req.params.cid;
  const instanciaCartManager = new cartManager("./carrito.json");
  instanciaCartManager.getCartById(cid).then((carrito) => {
    if (carrito !== undefined) {
      res.send(carrito.carts);
    } else {
      res.send(`No se ha encontrado el carrito con ID: ${cid}`);
    }
  });
});

//INSERTO PRODUCTO POR ID EN CARRITO POR ID
router.post("/:cid/product/:pid", (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let carritoEncontrado = undefined;
  let productoEncontrado = undefined;

  const instanciaCartManager = new cartManager("./carrito.json");
  let p1 = instanciaCartManager.getCartById(cid).then((carrito) => {
    if (carrito !== undefined) {
      carritoEncontrado = carrito;
    } else {
      res.send(`No se ha encontrado el carrito con ID: ${cid}`);
    }
  });


const instanciaProductManager = new productManager("./products.json");
  let p2 = instanciaProductManager.getProductById(pid).then((product) => {
    if (product !== undefined) {
      productoEncontrado = product
    } else {
      res.send(`No se ha encontrado el producto con ID: ${pid}`);
    }
  });

  Promise.all([p1,p2]).then(()=>{
    console.log('se terminaron las dos promeses')
    //res.send('se terminaron las dos promeses')

    if(productoEncontrado != undefined && carritoEncontrado != undefined){
        console.log('Se encontraron ambos')
    }else{
        console.log('Alguno no se encontro')
    }
  }).catch((err)=>{console.log(err)})



});

module.exports = router;
