let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let modifiesSchema = new Schema({
  idOwner: { type: String },
  phone: Number,//ok
  address: String,//ok
  username: String,
  name: String,
  status: { type: String, default: "pending" }
}, {
  collection: 'modify_owner',
  timestamps: true,
})
var modifiesModel = mongoose.model('modify_owner', modifiesSchema);
module.exports = modifiesModel;