const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: String,
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  birthday: Date, 
  address: String
}, {
  collection: 'users',
  timestamps: true
});
// Compile model from schema
var UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel;