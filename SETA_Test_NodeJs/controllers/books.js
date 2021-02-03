const {
  caseSuccess,
  caseErrorClient,
  caseErrorServer
} = require('../utils/results');
const {
  createBookService,
  updateBookService,
  deleteBookService,
  findAllBooksService,
  findOneBookService
} = require("../services/books");

const createBookController = async (req, res) => {
  try {
    const { name, author, description } = req.body;
    const idUser = req.user._id || req.body.idUser;
    const bookObject = { name, author, description, idUser };
    console.log(bookObject);
    const createBook = await createBookService(bookObject);
    if (createBook) {
      caseSuccess(res, "Bạn đã tạo sách thành công");
    } else {
      caseErrorClient(res, "Bạn đã tạo sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, description } = req.body;
    const bookObject = { name, author, description };
    const updateBook = await updateBookService(id, bookObject)
    if (updateBook) {
      caseSuccess(res, "Bạn đã cập nhật thành công");
    } else {
      caseErrorClient(res, "Bạn đã cập nhật thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await deleteBookService(id);
    if (deleteBook) {
      caseSuccess(res, "Bạn đã xóa thành công");
    } else {
      caseErrorClient(res, "Bạn đã xóa thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const findAllBooksController = async (req, res) => {
  try {
    const idUser = req.user._id || req.body.idUser;
    const allBooks = await findAllBooksService(idUser);
    if (allBooks) {
      caseSuccess(res, "Tất cả những quyển sách của bạn", allBooks);
    } else {
      caseErrorClient(res, "Lấy thông tin sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const findOneBooksController = async (req, res) => {
  try {
    const { id } = req.params;
    const oneBook = await findOneBookService(id);
    if (oneBook) {
      caseSuccess(res, "Sách của bạn", oneBook);
    } else {
      caseErrorClient(res, "Lấy thông tin sách thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}

module.exports = {
  createBookController,
  deleteBookController,
  updateBookController,
  findAllBooksController,
  findOneBooksController
}