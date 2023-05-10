const fs = require("fs");

const uuid4 = require("uuid4");

//Creo la clase CartManager

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

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
        console.log(`Se ha encontrado el carrito con ID ${id}.`);
        return cart;
      } else {
        console.error("Not found");
        return;
      }
    } catch (err) {
      return `ERROR ${err}`;
    }
  }

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
              if (producto.id === pid){
                console.log('se encontro ya un producto de esos')
                producto.quantity = producto.quantity + 1

                productos[index] = producto
                productFound = true
              }

            })


            if(!productFound)
            {

              console.log('no encontro el producto')
                //Creo el producto nuevo
                let nuevoProducto = {
                  id: pid,
                  quantity: 1
                }

    
                productos.push(nuevoProducto)

              }

           

            carrito.carts = productos
            console.log(carrito.carts)

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
