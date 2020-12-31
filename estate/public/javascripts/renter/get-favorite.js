 
$(document).on("click", ".mom-article .col-md-4 img", function(){
  location.assign(`/detail/${$(this).attr("idPost")}`);
});

$(document).on("click", ".mom-article .col-md-4 .title-article", function(){
  location.assign(`/detail/${$(this).attr("idPost")}`);
});

Cookies.remove("search");

$.ajax({
  method: "post",
  url: '/get-favorite-post',
  data:{
      idRenter: Cookies.get("idRenter")
  }
}).then(function(result){
console.log(result);
  result.data.favorite_arr.forEach((article, index) => {
      let html = `
                <div class="col-md-4 wow bounceInUp">
                  <div class="amount-image">
                    <i class="far fa-image"></i>
                    <span id="amount-image">${article.images_room.length}</span>
                  </div>
                  <img class="img-fluid" src=${article.images_room[0].trim()} idPost=${article._id}>
                  <div class="card card-body">
                    <h5 class="card-title title-article" idPost=${article._id}>${article.kind_room}</h5>
                    <div class="row info-article">
                      <div class="col-6 text-left">
                        <i class="fas fa-money-bill"></i><span>${article.price / 1000000} triệu/tháng</span>
                      </div>
                      <div class="col-6 text-right">
                        <i class="fas fa-home"></i><span>${article.area} m<sup>2</sup></span>
                      </div>
                      <div class="col-12 text-left">
                        <i class="fas fa-map-marker-alt"></i><span>${article.address_room}</span>
                      </div>
                      <div class="col-6 text-left">
                        <i class="far fa-clock"></i><span>${(new Date(article.createdAt)).getDate()}/${(new Date(article.createdAt)).getMonth()+1}/${(new Date(article.createdAt)).getFullYear()}</span>
                      </div>
                      <div class="col-3 text-right">
                           <i class="far fa-eye text-info" id="seen"></i><span>${article.seen}</span>
                        </div>
                      <div class="col-3 text-right">
                        <i class="far fa-trash-alt" id="delete" idPost=${article._id}></i>
                      </div>
                    </div>
                  </div>
                </div>
      `;
      $(".mom-article").append(html);
     
    })
}).catch(function(err){

})

