const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  img: [{ type: String }],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 좋아요 누른 사람들의 수를 계산하기 위해
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notice', noticeSchema);
