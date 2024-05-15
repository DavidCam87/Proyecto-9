const mongoose = require('mongoose');

const portatilSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: String, required: true }
},
  {
    timestamps: true,
    collection: 'products'
  }
);

const Portatil = mongoose.model('products', portatilSchema, 'products');
module.exports = Portatil;