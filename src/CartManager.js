const fs = require("fs");

const uuid4 = require("uuid4");

//Creo la clase ProductManager

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


}
module.exports = CartManager;
