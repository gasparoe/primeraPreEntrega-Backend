const fs = require("fs");

const uuid4 = require("uuid4");

//Creo la clase CartManager

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }


  //ADD CART
  async addCart() {
    let cart = {
      id: uuid4(),
      carts: [],
    };

    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      let carts = [];
      if (data.length > 1) {
        carts = JSON.parse(data);
      }
      this.carts = carts;
      this.carts.push(cart);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts),
        "utf-8"
      );
      return "El carrito se guardo correctamente";
    } catch (err) {
      return `Error ${err}`;
    }
  }


  //GET CART BY ID
  async getCartById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      let carts = [];
      if (data.length > 1) {
        carts = JSON.parse(data);
      }
      this.carts = carts;

      let cart = this.carts.find((cart) => cart.id === id);
      if (cart) {
        return cart;
      } else {
        console.error("Not found");
        return;
      }
    } catch (err) {
      return `ERROR ${err}`;
    }
  }

  //UPDATE CART BY ID
  async updateCartbyId(cid,pid){

    let isUpdated = false
    let productFound = false

    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      let carts = [];
      if (data.length > 1) {
        carts = JSON.parse(data);
      }
      this.carts = carts;

      
      this.carts.forEach((carrito,index)=>{

          if(carrito.id === cid){
            let productos = carrito.carts

            productos.forEach((producto,index) =>{
              //Si el producto ya se encuentra en el carrito, agrego 1 en la cantidad
              if (producto.id === pid){

                producto.quantity = producto.quantity + 1
                productos[index] = producto
                productFound = true

              }

            })

            //Si el producto no se crea en el carrito creo el objeto
            if(!productFound)
            {
                //Creo el producto nuevo con cantidad 1
                let nuevoProducto = {
                  id: pid,
                  quantity: 1
                }

                productos.push(nuevoProducto)

              }   

            carrito.carts = productos
            this.carts[index] = {id:cid, carts: carrito.carts}
            isUpdated = true
          }

        })

        if(isUpdated){
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.carts),
            "utf-8"
          ).then(()=>{return this.carts}).catch((err)=>{return `ERROR ${err}`});
        }
    } catch (err) {
      return `ERROR ${err}`;
    }
  }

}
module.exports = CartManager;
