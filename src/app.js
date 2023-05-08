const express = require("express");
const productManager = require("./ProductManager");

const app = express();
const routeProducts = require('./routes/products')
const routeCarts = require('./routes/carts')

app.use(express.json())

app.use('/api/products', routeProducts)
app.use('/api/carts', routeCarts)


app.listen(8080, () => {
  console.log("Server corriendo en port 8080");
});


// app.get("/products", (req, res) => {
//   let limit = req.query.limit;
//   const instanciaProductManager = new productManager("./products.json");
//   instanciaProductManager.getProducts().then((products) => {
//     if (limit !== undefined) {
//       res.send(products.slice(0, limit));
//     } else {
//       res.send(products);
//     }
//   });
// });

// app.get("/products/:pid", (req, res) => {
//   let pid = parseInt(req.params.pid);
//   const instanciaProductManager = new productManager("./products.json");
//   instanciaProductManager.getProductById(pid).then((product) => {
//     if (product !== undefined) {
//       res.send(product);
//     } else {
//       res.send(`No se ha encontrado el producto con ID: ${pid}`);
//     }
//   });
// });