const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema({
  name: String,
  images: {
    type: Array,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  idUser: {
    type: String,
    ref: "users"
  },
  description: {
    type: String,
    require: true
  }
}, { timestamps: true });
// Compile model from schema
var BooksModel = mongoose.model('books', BooksSchema);
module.exports = BooksModel;