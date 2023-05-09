const express = require("express");


const app = express();
const routeProducts = require('./routes/products')
const routeCarts = require('./routes/carts')

app.use(express.json())

app.use('/api/products', routeProducts)
app.use('/api/carts', routeCarts)


app.listen(8080, () => {
  console.log("Server corriendo en port 8080");
});