
var arr = location.pathname.split("/");

$.ajax({
  method: 'get',
  url: "/detailPost/" + arr[2]
}).then(function (result) {
  let article = result.data;
  console.log(article);
  let images = article.images_room;
  images.forEach((image, index) => {
    let _image = "../".concat(image.trim());
    let html = `
     <a href=${_image} data-toggle="lightbox" data-gallery="gallery" class=${index == 0 ? "col-md-12" : "col-md-6"}>
     <img src=${_image} class="img-fluid rounded">
     </a>
     `;
    $(".image-group").append(html);
  })
  let info_owner = article.idOwner;
  $("#name-owner").text(info_owner.name);
  $("#telephone-owner").text("0" + info_owner.phone);
  $("#email-owner").text(info_owner.email);

  $("#date-start").text((new Date(article.createdAt)).getDate() + "/" + ((new Date(article.createdAt)).getMonth() + 1) + "/" + (new Date(article.createdAt)).getFullYear());
  $("#date-end").text((new Date(article.expire_post)).getDate() + "/" + ((new Date(article.expire_post)).getMonth() + 1) + "/" + (new Date(article.expire_post)).getFullYear());

  $("#name").text(article.kind_room);
  $("#address").text(article.address_room);
  $("#status").text(article.rent_status);
  $("#an-ninh").text(article.general_owner);
  $("#dien-tich").text(article.area);
  $("#tien-dien").text(article.electricity_price);
  $("#tien-nuoc").text(article.water_price);
  $("#so-phong").text(article.number_room);
  $("#tien-thue").text(article.price);

  if (article.balcony == "Yes") {
    $("#ban-cong").addClass("display");
  }

  if (article.conditioning == "Yes") {
    $("#dieu-hoa").addClass("display");
  }

  if (article.hot_cold_bottles == "Yes") {
    $("#binh-nong-lanh").addClass("display");
  }

  if (article.other_utility.indexOf("Tủ lạnh") != -1) {
    $("#tu-lanh").addClass("display");
  }

  if (article.other_utility.indexOf("Máy giặt") != -1) {
    $("#may-giat").addClass("display");
  }

}).catch(function (err) {
  console.log(err);
})

$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});


$(function () {
  var star = '.star',
    selected = '.selected';

  $(star).on('click', function () {
    $(selected).each(function () {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');
    // console.log( 5 - $(selected).length);
  });

});