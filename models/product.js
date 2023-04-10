const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, require: true },
  size: { type: String },
  color: { type: String },
  category: { type: String },
  img: [{ type: String }],
  quantity: { type: Number, default: 0 },
  detail: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
