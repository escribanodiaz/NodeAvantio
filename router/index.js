'use strict';

const express = require('express');
const api = new express.Router();

const productController = require('../controllers/product.js');

api.get('/product', productController.getProducts);
api.get('/product/:id',productController.getProductsId);
api.post('/product', productController.saveProduct);
api.put('/product/:id', productController.updateProduct);
api.delete('/product/:id', productController.deleteProduct);

module.exports = api;