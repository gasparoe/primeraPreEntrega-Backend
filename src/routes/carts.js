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
      res.status(500).send(`${err}`);
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
  }).catch(res.status(500).send({"error":"server error"}));
});

//INSERTO UN PRODUCTO POR ID EN CARRITO
router.post("/:cid/product/:pid", (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let carritoEncontrado = undefined;
  let productoEncontrado = undefined;

  //Primero chequeo si existe el carrito con ese ID y tambien si existe el producto con ese ID

  //Utilizo la funcion GetCardbyId ya creada anteriormente
  const instanciaCartManager = new cartManager("./carrito.json");
  let p1 = instanciaCartManager.getCartById(cid).then((carrito) => {
    if (carrito !== undefined) {
      carritoEncontrado = carrito;
    }
  });

  //Utilizo la funcion GetProductById ya creada en la clase ProductManager
  const instanciaProductManager = new productManager("./products.json");
  let p2 = instanciaProductManager.getProductById(pid).then((product) => {
    if (product !== undefined) {
      productoEncontrado = product;
    }
  });

  //Espero que esas dos promesas terminen
  Promise.all([p1, p2])
    .then(() => {
      //Si se encontro el carrito y el producto entonces ejecuto la actualizacion del carrito introduciendo ese producto con la funcion UpdateCartbyId
      if (productoEncontrado != undefined && carritoEncontrado != undefined) {
        instanciaCartManager.updateCartbyId(cid, pid).then((nuevoCarrito) => {
          res.send("Se actualizo el carrito correctamente");
        });
        //Devuelvo como respuesta en caso de no encontrar alguno o los dos ids.
      } else if (
        productoEncontrado == undefined &&
        carritoEncontrado != undefined
      ) {
        res.send("No se encontro el producto pero si el carrito");
      } else if (
        carritoEncontrado == undefined &&
        productoEncontrado != undefined
      ) {
        res.send("No se encontro el carrito pero si el producto");
      } else if (
        carritoEncontrado == undefined &&
        productoEncontrado == undefined
      ) {
        res.send("No se encontro ni el carrito ni el producto");
      }
    })
    .catch((err) => {
      res.status(500).send(`${err}`)
    });
});

module.exports = router;
