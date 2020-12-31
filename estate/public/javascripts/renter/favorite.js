 
 
$('.carousel').carousel({
  interval: 3000
}); 

/*
if(Cookies.get("token")){
  $.ajax({
      method: "post",
      url: "/get-favorite-post",
      data: {
          idRenter: Cookies.get("idRenter")
      }
  }).then(function(result){
      $("#amount-like").text(result.data.favorite_arr.length);

  }).catch(function(err){
      console.log(err);
  });

}else{
  $("#amount-like").text(0);
}
*/

$(document).on("click", ".amount-like", function(){
  if(Cookies.get("token")){
     
      location.assign("/favorite");
     
  }else{
      alert("Bạn phải đăng nhập để sử dụng chức năng này.")
  }

});

$(document).on("click", "#like", function(event){
  
  if(Cookies.get("token")){
      console.log($(this));
      let x = $(this);
      console.log($(this).attr("idPost"), Cookies.get("idRenter"));
      $.ajax({
          method: "post",
          url: "/save-favorite-post",
          data: {
              idPost: $(this).attr("idPost"),
              idRenter: Cookies.get("idRenter")
          }
      }).then(function(result){

          $("#amount-like").text(result.data.favorite_arr.length);
         
          $(x.next()).text(result.data.total_like);
  
      }).catch(function(err){
          console.log(err);
      });

  }else{
      alert("Bạn phải đăng nhập để sử dụng chức năng này.")
  }

});





