let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  name: String,//ok
  birthday: Date, 
  phone: Number,//ok
  address: String,//ok
  identification: Number,//ok
  username: String,
  email: String,//ok
  password: String,//ok
  role: { type: String, default: 'user' },//ok
}, {
  collection: 'users',
  timestamps: true,
})
var userModel = mongoose.model('users', userSchema);
module.exports = userModel;