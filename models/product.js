const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String },
  price: { type: Number },
  size: { type: String },
  color: { type: String },
  category: { type: String },
  img: [{ type: String }],
  quantity: { type: Number, default: 0 },
  detail: { type: String },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
