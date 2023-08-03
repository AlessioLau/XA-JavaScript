/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
1) Arreglar errores existentes en el código
    a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.    
    b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.
​
2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa
​
3) Utilizar la función eliminarProducto utilizando .then() y .catch()
​
*/

// Cada producto que vende el super es creado con esta clase
class Producto {
  sku; // Identificador único del producto
  nombre; // Su nombre
  categoria; // Categoría a la que pertenece este producto
  precio; // Su precio
  stock; // Cantidad disponible en stock

  constructor(sku, nombre, precio, categoria, stock) {
    this.sku = sku;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;

    // Si no me definen stock, pongo 10 por default
    if (stock) {
      this.stock = stock;
    } else {
      this.stock = 10;
    }
  }
}

// Creo todos los productos que vende mi super
const queso = new Producto("KS944RUR", "Queso", 10, "lacteos", 4);
const gaseosa = new Producto("FN312PPE", "Gaseosa", 5, "bebidas");
const cerveza = new Producto("PV332MJ", "Cerveza", 20, "bebidas");
const arroz = new Producto("XX92LKI", "Arroz", 7, "alimentos", 20);
const fideos = new Producto("UI999TY", "Fideos", 5, "alimentos");
const lavandina = new Producto("RT324GD", "Lavandina", 9, "limpieza");
const shampoo = new Producto("OL883YE", "Shampoo", 3, "higiene", 50);
const jabon = new Producto("WE328NJ", "Jabon", 4, "higiene", 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [
  queso,
  gaseosa,
  cerveza,
  arroz,
  fideos,
  lavandina,
  shampoo,
  jabon,
];

// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos; // Lista de productos agregados
    categorias; // Lista de las diferentes categorías de los productos en el carrito
    precioTotal; // Lo que voy a pagar al finalizar mi compra
  
    // Al crear un carrito, empieza vacío
    constructor() {
      this.precioTotal = 0;
      this.productos = [];
      this.categorias = [];
    }
  
    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async mostrarCarrito() {
      console.log("Mostrando carrito: ");
      console.log(this.productos);
      console.log(`Categorias del carrito ${this.categorias}`);
      console.log(`Precio total del carrito: ${this.precioTotal}`);
    }
  
    async agregarProducto(sku, cantidad) {
      console.log(`Agregando ${cantidad} ${sku}`);
  
      try {
        const producto = await findProductBySku(sku);
        console.log("Producto encontrado", producto);
  
        const productoExistente = this.productos.find(
          (product) => product.sku === sku
        );
        if (this.categorias.includes(producto.categoria)) {
          console.log(`Categoria previamente incluida: ${producto.categoria}`);
        } else {
          console.log(`Categoria nueva a incluir: ${producto.categoria}`);
          this.categorias.push(producto.categoria);
        }
        if (productoExistente) {
          console.log(`Ya se encuentra en el carrito: ${productoExistente.sku}`);
          productoExistente.cantidad += cantidad;
        } else {
          console.log("Producto nuevo");
          const nuevoProducto = new ProductoEnCarrito(
            sku,
            producto.nombre,
            cantidad
          );
          this.productos.push(nuevoProducto);
        }
        this.precioTotal = this.precioTotal + producto.precio * cantidad;
      } catch (err) {
        console.log(err);
      }
    }
  
    async eliminarProducto(sku, cantidad) {
        return new Promise(async (resolve, reject) => {
          try {
            const producto = await findProductBySku(sku);
            
            const productoExistente = this.productos.find((product) => product.sku === sku);
    
            if (productoExistente) {
              if (cantidad < productoExistente.cantidad) {
                productoExistente.cantidad -= cantidad;
                this.precioTotal -= producto.precio * cantidad;
              } else {
                this.productos = this.productos.filter((product) => product.sku !== sku)
                this.precioTotal -= producto.precio * productoExistente.cantidad;
              }
              
              resolve(`Producto ${sku} eliminado o cantidad restada del carrito`);
            } else {
              reject(`El producto no existe en el carrito`);
            }
          } catch (err) {
            console.log(err);
            reject(`Error al eliminar el producto: ${err}`);
          }
        });
      }
    
  }
  
// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
  sku; // Identificador único del producto
  nombre; // Su nombre
  cantidad; // Cantidad de este producto en el carrito

  constructor(sku, nombre, cantidad) {
    this.sku = sku;
    this.nombre = nombre;
    this.cantidad = cantidad;
  }
}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundProduct = productosDelSuper.find(
        (product) => product.sku === sku
      );
      if (foundProduct) {
        resolve(foundProduct);
      } else {
        reject(`Product ${sku} not found`);
      }
    }, 1500);
  });
}


async function main() {
    const carrito = new Carrito();
  
    try {
      await carrito.agregarProducto("WE328NJ", 2);
      await carrito.agregarProducto("WE328NJ", 10);
      await carrito.agregarProducto("OL883YE", 2);
      await carrito.agregarProducto("FN312PPE", 2);
      await carrito.agregarProducto("A", 2);
      await carrito.mostrarCarrito();
      
      // Utilizando eliminarProducto con .then() y .catch()
      const promesaEliminar = carrito.eliminarProducto("WE328NJ", 20);
      await promesaEliminar.then((accion) => {
          console.log(accion);
      })
      .catch((accion) => {
          console.log(accion);
      });
      
      // Mostrar el estado final del carrito
      await carrito.mostrarCarrito();
    } catch (err) {
      console.log(err);
    }
  }
  
  main();