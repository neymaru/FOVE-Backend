const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String },
    addressDetail: { type: String },
    zip: { type: String },
    points: { type: Number, dafault: 0 },
    isMessageAccept: { type: Boolean, default: false },
    birth: { type: String },
    isThirdPartyConsent: { type: Boolean, default: false },
    isDataProcessingDelegation: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
  },
  {
    collection: 'user',
  },
);

module.exports = mongoose.model('User', userSchema);
