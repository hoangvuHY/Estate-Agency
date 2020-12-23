
var arr = location.pathname.split("/");

$.ajax({
  method: 'post',
  url: '/seen-post',
  data: {
    idPost: Cookies.get("idPost")
  }
}).then(function (result) {
  console.log(result);
}).catch(function (err) {
  console.log(err);
})




$.ajax({
  method: 'get',
  url: "/detailPost/" + arr[2]
}).then(function (result) {
  let article = result.data;
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
  //ID baif vieets
  $("#name").attr("data-id-post", article._id);
  $("#name").text(article.kind_room);

  $("#name").attr("idPost", article._id);

  $("#address").text(article.address_room);

  if (article.rent_status == "Not yet hired") {
    article.rent_status = "Chưa được thuê";
  } else {
    article.rent_status = "Đã được thuê";
  }

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

// Khi bấm vào star nó sẽ tự hiện tích bao nhiêu sao
$(function () {
  var star = '.star',
    selected = '.selected';

  $(star).on('click', function () {
    $(selected).each(function () {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');
  });

});
// Comment của người thuê
const five = 5;

$('#send-comment').click(function () {
  var content = $('#comment-render').val();
  var token = Cookies.get('token');

  if (token) {
    if (content && $('span.fa.fa-star').hasClass('selected')) {
      var voteStar = $('.star.selected ~ .star').length + 1;
      var idPost = $('#name').attr('data-id-post');
      $.ajax({
        url: '/comment-renter',
        method: 'post',
        data: {
          token, voteStar, content, idPost
        }
      }).then((result) => {
        if (!result.error && result.status === 200) {
          alert(result.message);
          window.location.href = '/detail/' + idPost
        } else {
          alert(result.message);
        }
      }).catch((error) => {
        alert("Lỗi do server");
      })
    } else {
      alert('Bạn cần điền bình luận và đánh giá bài viết')
    }
  } else {
    alert('Bạn cần đăng nhập trước');
    window.location.href = '/login';
  }
});
// Report của người thuê
reportToAdmin();
function reportToAdmin() {
  $.ajax({
    url: '/users/user-detail',
    method: 'get',
  }).then((result) => {
    var { dataUser } = result;
    var template;
    if (dataUser._id) {
      template = `
      <h1 class="text-center"><i class="fas fa-exclamation-triangle"></i> BÁO CÁO TIN GIẢ</h1>
          <div>
            <label class="color">Tên: ${dataUser.name}</label> 
          </div>
          <div>
            <label class="color">Số điện thoại: 0${dataUser.phone}</label> 
          </div>
          <div>
            <label class="color">Email: ${dataUser.email}</label>
          </div>
          <div>
            <label class="color">Nội dung báo cáo</label>
            <textarea class="w-75 pl-2 contentReport"></textarea>
          </div>
      <div onClick= handleSendToAdmin.call(this) data-id="${dataUser._id}" class="send" id="send-report">SEND</div> 
      `;
    }
    $(".report").append(template)

  }).catch((error) => {

  })

}

function handleSendToAdmin() {
  var content = $(".contentReport").val();
  var idPost = $('#name').attr('data-id-post');
  console.log(idPost);
  var idRenter = $(this).data('id');
  var typeOpinion = "report";

  if (!content && content == '') {
    alert('Bạn phải nhập nội dung báo cáo');
  } else {
    console.log(content, idPost, idRenter, typeOpinion);
    $.ajax({
      url: '/report-renter',
      method: 'post',
      data: {
        content, idPost, idRenter, typeOpinion
      }
    }).then((result) => {
      if (!result.error && result.status === 200) {
        alert(result.message);
        window.location.href = '/detail/' + idPost
      } else {
        alert(result.message);
      }
      console.log(error);
    }).catch((error) => {
    })
  }
}
// Cookies.set("idPost", $(this).attr("idPost"));
//Tất cả comment của người thuê
allCommentRenter();
function allCommentRenter() {
  // Lấy id của bài Viết
  var idPost = Cookies.get('idPost');
  $.ajax({
    url: '/all-post-comments/' + idPost,
    method: 'get'
  }).then((result) => {
    console.log(result);
    var { allPostComment } = result;
    allPostComment.forEach(element => {
      /* 
      
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
      
      */
      var arr = [];
      for (var i = 0; i < 5; i++) {
        if (i < element.voteStar) {
          arr[i] = 'checked';
        } else arr[i] = "";
      }
      var template = ` 
      
      <div class="comment">
      <img src="/public/images/user-avatar.png" alt="">
      <div class="row">
        <div class="col-12"> ${element.idRenter.name}</div>
        <div class="col-12">
          <div class="vote">
            <span class="fa fa-star  ${arr[0]}"></span>
            <span class="fa fa-star  ${arr[1]}"></span>
            <span class="fa fa-star  ${arr[2]}"></span>
            <span class="fa fa-star  ${arr[3]}"></span>
            <span class="fa fa-star  ${arr[4]}"></span>
          </div >
      <div class="time"> ${new Date(element.createdAt).toLocaleDateString()}</div>
        </div >
      <div class="col-12">${element.content}</div>
      </div >
      </div >
      `;
      $("#renterComments").append(template);

    })
  }).catch((error) => {

  })
}

