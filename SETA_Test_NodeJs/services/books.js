const Users = require('../model/users');
const Books = require('../model/books');

const createBookService = (book) => {
  return Books.create(book);
}
const updateBookService = (_id, bookUpdate) => {
  return Books.updateOne({ _id }, bookUpdate);
}
const deleteBookService = (_id) => {
  return Books.deleteOne({ _id });
}
const findAllBooksService = (idUser) => {
  return Books.find({ idUser });
}
const findOneBookService = (_id) => {
  return Books.findOne({ _id });
}


module.exports = {
  createBookService,
  updateBookService,
  deleteBookService,
  findOneBookService,
  findAllBooksService
}
