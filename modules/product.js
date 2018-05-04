'use strict';

const mongooose = require('mongoose');
const Schema = mongooose.Schema;

// Esquema Producto
const productSchema = Schema({
  name: String,
  picture: String,
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['computers','phones','accesories']
  },
  description: String
});

modules.exports = mongooose.model('Prooduct', productSchema);