const fs = require("fs");

//Creo la clase ProductManager

class ProductManager {
  constructor(path) {
    this.products = [];
    this.id = 1;
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      code != undefined &&
      stock != undefined
    ) {
      //Incremento el id cada vez que se crea un producto nuevo

      let product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: this.id,
      };

      try {
        const data = await fs.promises.readFile(this.path, "utf-8");
        let products = [];
        if (data.length > 1) {
          products = JSON.parse(data);
        }
        this.products = products;
        console.log("termine de leer");

        if (this.products.find((producto) => producto.code === product.code)) {
          console.log("Ya existe un producto con ese codigo");
        } else {
          this.products.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products),
            "utf-8"
          );
          this.id++;
          console.log("El archivo se guardo correctamente");
        }
      } catch (err) {
        console.error(`Error ${err}`);
      }
    } else {
      console.log(
        "No se puede crear el producto. Faltan definir caracteristicas"
      );
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      let products = [];
      if (data.length > 1) {
        products = JSON.parse(data);
      }
      this.products = products;
      return this.products;
    } catch (err) {
      console.error(`ERROR ${err}`);
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      let products = [];
      if (data.length > 1) {
        products = JSON.parse(data);
      }
      this.products = products;

      let product = this.products.find((producto) => producto.id === id);
      if (product) {
        console.log(`Se ha encontrado el producto con ID ${id}.`);
        return product;
      } else {
        console.error("Not found");
        return;
      }
    } catch (err) {
      console.error(`ERROR ${err}`);
    }
  }

  async updateProduct(id, nuevoProducto) {
    try {
      let isUpdated = false;
      const data = await fs.promises.readFile(this.path, "utf-8");
      let products = [];
      if (data.length > 1) {
        products = JSON.parse(data);
      }
      this.products = products;

      this.products.forEach((producto, index) => {
        if (producto.id === id) {
          if (nuevoProducto.title != undefined) {
            producto.title = nuevoProducto.title;
          }

          if (nuevoProducto.description != undefined) {
            producto.description = nuevoProducto.description;
          }

          if (nuevoProducto.price != undefined) {
            producto.price = nuevoProducto.price;
          }

          if (nuevoProducto.thumbnail != undefined) {
            producto.thumbnail = nuevoProducto.thumbnail;
          }

          if (nuevoProducto.code != undefined) {
            producto.code = nuevoProducto.code;
          }

          if (nuevoProducto.stock != undefined) {
            producto.stock = nuevoProducto.stock;
          }

          //ANTES DE ACTUALIZAR EL PRODUCTO, VERIFICO QUE EL NUEVO CODIGO DEL PRODUCTO ACTUALIZADO NO EXISTA
          if (
            this.products.find(
              (product) =>
                product.code === producto.code && product.id !== producto.id
            )
          ) {
            console.log("Ya existe un producto con ese codigo");
          } else {
            this.products[index] = producto;
            isUpdated = true;
          }
        }
      });
      if (isUpdated) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products),
          "utf-8"
        );
        console.log("Se ha actualizado el producto correctamente");
      } else {
        console.log("No se ha podido actualizar el producto");
      }
    } catch (err) {
      console.error(`Error ${err}`);
    }
  }

  async deleteProduct(id) {
    try {
      let isDeleted = false;
      const data = await fs.promises.readFile(this.path, "utf-8");
      let products = [];
      if (data.length > 1) {
        products = JSON.parse(data);
      }
      this.products = products;

      this.products.forEach((producto, index) => {
        if (producto.id === id) {
          this.products.splice(index, 1);
          isDeleted = true;
        }
      });

      if (isDeleted) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products),
          "utf-8"
        );
        console.log("Se elimino el producto correctamente");
      } else {
        console.log("No se ha encontrado el producto a eliminar");
      }
    } catch {
      console.error(`Error ${err}`);
    }
  }
}
module.exports = ProductManager