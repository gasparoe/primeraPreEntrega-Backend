const express = require("express");
const productManager = require("../ProductManager");

const { Router } = express;

const uuid4 = require("uuid4");

const router = new Router();

//GET PRODUCTOS
router.get("/", (req, res) => {
  let limit = req.query.limit;
  const instanciaProductManager = new productManager("./products.json");
  instanciaProductManager.getProducts().then((products) => {
    if (limit !== undefined) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  }).catch((err) => res.status(500).send({"error":"server error"}));
});

//GET PRODUCTOS POR ID
router.get("/:pid", (req, res) => {
  let pid = req.params.pid;
  const instanciaProductManager = new productManager("./products.json");
  instanciaProductManager.getProductById(pid).then((product) => {
    if (product !== undefined) {
      res.send(product);
    } else {
      res.send(`No se ha encontrado el producto con ID: ${pid}`);
    }
  }).catch((err) => res.status(500).send({"error":"server error"}));
});

//POST AGREGAR PRODUCTO
router.post("/", (req, res) => {
  let data = req.body;
  const instanciaProductManager = new productManager("./products.json");
  instanciaProductManager
    .addProduct(
      data.title,
      data.description,
      data.code,
      data.price,
      data.status,
      data.stock,
      data.category,
      data.thumbnail
    )
    .then((estado) => res.send(`${estado}`))
    .catch((err) => res.status(500).send(`${err}`));
});

//PUT ACTUALIZAR PRODUCTO POR ID
router.put("/:pid", (req, res) => {
    let pid = req.params.pid
    let data = req.body;
    const instanciaProductManager = new productManager("./products.json");
    instanciaProductManager
      .updateProduct(pid,data)
      .then((estado) => res.send(`${estado}`))
      .catch((err) => res.status(500).send(`${err}`));
  });

  //DELETE PRODUCTO POR ID
router.delete("/:pid", (req, res) => {
    let pid = req.params.pid
    const instanciaProductManager = new productManager("./products.json");
    instanciaProductManager
      .deleteProduct(pid)
      .then((estado) => res.send(`${estado}`))
      .catch((err) => res.status(500).send(`${err}`));
  });

module.exports = router;
