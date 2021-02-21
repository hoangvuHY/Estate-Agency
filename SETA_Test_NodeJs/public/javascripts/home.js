document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
$(document).ready(function () {
  $('.modal').modal();
  $('.addBook').click(addBook);
  getAllBooks();
  $(".logout").click(logoutUser);
});

const addBook = async (e) => {
  e.preventDefault();
  const name = $("#name-book-add").val();
  const author = $("#author-book-add").val();
  const description = $("#textarea-add").val();
  console.log(name, author, description);
  await $.ajax({
    method: "post",
    url: "/books/create",
    data: {
      name, author, description
    }
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      window.location.href = '/'
      alert(result.message);
    } else {
      alert(result.message);
    }
  }).catch((err) => {
    console.log(err);
  });

}
/* 
$(".reset-value").click(resetValue);
const resetValue = () => {
  var name = $("#name-book-add");
  var author = $("#author-book-add");
  var description = $("#textarea-add");
  name.val("").removeClass('valid');
  author.val("").removeClass('valid');
  description.val("");
  $('label').removeClass('active');
} */

const getAllBooks = async () => {
  await $.ajax({
    type: "get",
    url: "/books"
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      const { data } = result;
      const allBook = $(".all-books");
      allBook.empty();
      data.forEach(book => {
        const template = `
      <div class="col s6 m6 l4 xl3">
        <div class="card">
          <div class="card-image">
            <img src="https://materializecss.com/images/sample-1.jpg">
            <span class="card-title">${book.name}</span>
          </div>
          <div class="card-content">
            <p class='description' >
             ${book.description}  
            </p>
            <p class="book-authors"> ${book.author}</p>
          </div>
          <div class="card-action">
            <a data-id=${book._id} onclick= updateBook.call(this)  class="btn-update-book waves-effect waves-light btn modal-trigger" href="#update-book">Update</a>
            <button data-id=${book._id} onclick= deleteBook.call(this) class="btn-delete-book waves-effect waves-light btn">Delete</button>
          </div>
        </div>
      </div>
  `
        allBook.append(template);
      });
    }
  }).catch((err) => {
    console.log(err);
  });
}

async function deleteBook() {
  const idBook = $(this).attr('data-id');
  console.log(idBook);
  confirm("Bạn có muốn xóa không?") && await $.ajax({
    type: "delete",
    url: "/books/delete/" + idBook,
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      alert(result.message);
      $(this).parent().parent().parent().remove();
    } else {
      alert(result.message)
    }
  }).catch((err) => {
    console.log(err);
  });
}
async function updateBook() {
  const idBook = $(this).attr('data-id');
  getInfoBook(idBook)
}

const getInfoBook = (idBook) => {
  $.ajax({
    type: "get",
    url: "/books/" + idBook,
  }).then((result) => {
    const { data } = result;

    if (result.status === 200 && !result.error) {
      $("#update-book").empty();
      const template = `

      <div class="modal-content">

      <h4 class="header">Update Book</h4>
      <div class="row name-book ">
        <div class="input-field">
          <!--   col s12 -->
          <input value='${data.name}' id="name-book-update" type="text" class="valid validate">
          <label class='active' for="name-book-update">Name Book</label>
        </div>
      </div>
      <div class="row authors">
        <div class="input-field">
          <!--   col s12 -->
          <input  value='${data.author}' id="author-book-update" type="text" class="valid validate">
          <label class='active' for="author-book-update">Author Book</label>
        </div>
      </div>
      <div class="row descriptions ">
        <div class="input-field col s12">
          <textarea id="textarea-update" class="materialize-textarea valid">${data.description}</textarea>
          <label class='active' for="textarea-update">Textarea</label>
        </div>
              
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" data-id=${data._id} onclick=acceptUpdateBook.call(this) class="updateBook modal-close waves-effect waves-green btn-flat">Update</a>
      </div>
      `;
      $("#update-book").append(template);
    }
  }).catch((err) => {
    console.log(err);
  });
  ;
}
const logoutUser = (e) => {
  e.preventDefault();
  Cookies.remove("token");
  window.location.href = '/login';
}

async function acceptUpdateBook() {
  const id = $(this).attr('data-id');
  const name = $("#name-book-update").val();
  const author = $("#author-book-update").val();
  const description = $("#textarea-update").val();
  await $.ajax({
    method: "put",
    url: "/books/update/" + id,
    data: {
      name, author, description
    }
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      window.location.href = '/'
      alert(result.message);
    } else {
      alert(result.message);
    }
  }).catch((err) => {
    console.log(err);
  });
}
