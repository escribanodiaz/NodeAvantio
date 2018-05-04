'use strict';

cont Products = require('../modules/product');

function getProducts(req, res) {
  // Req -> info del servidor, Res -> respuesta del servidor al cliente

  Products.find({}, (err, products) => {
    if(err) {
      return res.status(500).send({msg: `Error al realizar la petición al servidor: $(err)}`});
    }
    if(!products) {
      return res.status(404).send({msg: `Producto no encontrado $(err)`});
    }
    res.status(200).send({
      products: products
    });
  });
}

function getProductsId(req, res){
  let productId = req.params.id;

  Products.find({ productId }, (err, product) => {
    if(err) {
      return res.status(500).send({msg: `Error en el servidor $(err)`});
    }
    if(!product) {
      return res.status(404).send({msg: `Producto no encontrado $(err)`});
    }
    res.status(200).send({
      product: product
    });
  });
}

function saveProduct(req, res) {
  let product = new Product();

  product.new = req.body.name;
  product.new = req.body.picture;
  product.new = req.body.price;
  product.new = req.body.category;
  product.new = req.body.description;

  product.save((err, productStore) => {
    if(err) {
      return res.status(500).send({msg: `Error en el servidor $(err)`});
    }
    res.status(200).send({
      msg: productStore
    });
  });
}

function updateProduct(req, res) {
  let idUpdateProduct = req.params.id;
  let contentUpdate = req.body;

  Product.findByIdUpdate(idUpdateProduct, contentUpdate, (err, productUpdate) => {
    if(err) {
      return req.status(500).send({msg: `El producto no se ha podido modificar $(err)`});
    }
    if(!product){
      return req.status(404).send({msg: `No se a encontrado el producto $(err)`});
    }
    req.status(200).send({
      msg: `Producto modificado correctamente`
    }, productUpdate);
  });
}

function deleteProduct(req, res) {
  let idDeleteProduct = req.params.id;

  Product.findById(idDeleteProduct, (err, product) => {
    if(err) {
      return req.status(500).send({msg: `Fallo en el servidor $(err)`});
    }
    if(!product) {
      return req.status(404).send({msg: `Producto no existe $(err)`});
    }
    product.remove(err => {
      if(err) {
        return req.status(500).send({msg: `Error al buscado el producto $(err)`});
      }
      req.status(200).send({msg: `El producto se a eliminado correctamente`});
    });
  });
}

module.exports = {
  getProducts,
  getProductsId,
  saveProduct,
  updateProduct,
  deleteProduct
}