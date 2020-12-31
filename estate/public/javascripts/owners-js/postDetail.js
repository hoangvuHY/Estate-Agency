
getData();
function getData() {
  $.ajax({
    method: "GET",
    url: '/owners/owner-posts'
  }).then((result) => {
    var { dataPost } = result;
    $("tbody.infoPost").empty();
    var template, rentStatus;
    dataPost.forEach((element) => {
      if (element.status === 'pending') {
        // Waiting for approval 
        template = ` 
                <tr>
                  <td>${element.address_room}</td>
                  <td>${element._id}</td>
                  <td>${new Date(element.createdAt).toLocaleDateString()}</td>
                  <td></td>
                  <td>${element.status}</td>  
                  <td></td>
                  <td class='buttonHandle'>
                    <button onClick = handleEditPost.call(this)  data-id = ${element._id}  type="button" class="btn btn-warning "data-toggle="modal" data-target="#btn-edit">
                      <i class="far fa-edit"></i>
                    </button>  
                    <button  onClick = handleDeletePost.call(this)  data-id = ${element._id}  type="button" class="btn btn-danger btn-delete">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                <tr> 
        `;
      } else if (element.status === 'expired') {
        template = ` 
        <tr>
          <td>${element.address_room}</td>
          <td>${element._id}</td>
          <td>${new Date(element.createdAt).toLocaleDateString()}</td>
          <td></td>
          <td>${element.status}</td>  
          <td></td>
          <td class='buttonHandle'>
            <button onClick = handleExtend.call(this)  data-id = ${element._id}  type="button" class="btn btn-warning "data-toggle="modal" data-target="#btn-edit">
              <i class="fas fa-external-link-square-alt"></i>
            </button>
          </td>
        <tr> 
      `;
      } else if (element.status === 'active') {
        if (element.rent_status === 'Hired') {
          template = `  
                <tr>
                  <td>${element.address_room}</td>
                  <td>${element._id}</td>
                  <td>${new Date(element.createdAt).toLocaleDateString()}</td>
                  <td></td>
                  <td>${element.status}</td>  
                  <td>${element.rent_status}</td>  
                  <td></td>  
                <tr>
          `;
        } else {//Not yet hired 

          template = `  
          <tr>
            <td>${element.address_room}</td>
            <td>${element._id}</td>
            <td>${new Date(element.createdAt).toLocaleDateString()}</td>
            <td>${new Date(element.expire_post).toLocaleDateString()}</td>
            <td>${element.status}</td>  
            <td>${element.rent_status}</td>  
            <td></td>  
          <tr>
          `;//Not yet hired 

        }
      } else {
        template = `
        <tr>
          <td>${element.address_room}</td>
          <td>${element._id}</td>
          <td>${new Date(element.createdAt).toLocaleDateString()}</td>
          <td>${new Date(element.expire_post).toLocaleDateString()}</td>
          <td>${element.status}</td>  
          <td></td>
        <tr>
          `;
      }
      if (element.status === "active" && element.rent_status === 'Not yet hired') {
        template = `  
        <tr>
          <td>${element.address_room}</td>
          <td>${element._id}</td>
          <td>${new Date(element.createdAt).toLocaleDateString()}</td>
          <td>${new Date(element.expire_post).toLocaleDateString()}</td>
          <td>${element.status}</td>  
          <td>${element.rent_status}</td>  
          <td></td>  
          <td class="button-hiredOwner">
            <button  onClick = handleHiredPost.call(this) data-id-owner = ${element.idOwner} style="font-size:13px;padding: 7px; " data-id = ${element._id}  type="button" class="btn btn-primary btn-hired">
                  <i style="  margin-right: 5px;" class="fas fa-check"></i>Hired
              </button>
          </td>    
        <tr>
        `;//Not yet hired 
      }
      $("tbody.infoPost").append(template);


    })
  }).catch((error) => {
    console.log(error);
  })
}
function handleExtend() {
  // cho vao model:  .content-update
  // Khi mà bấm vào nút gia hạn
  var idPost = $(this).attr("data-id");
  $.ajax({
    ///detail-post/:idPost. Lấy thông tin của bài viết
    method: 'GET',
    url: "/owners/detail-post/" + idPost
  }).then((result) => {
    var { dataPost } = result;
    $('.content-update').empty();
    // Hiện modal lên
    template = `
       
 <style>
   * {
     margin: 0;
     padding: 0
   }
 
   .images-detail .image-room {
     width: 20%;
 
   }
 
   label.hot-cold-bottles {
     display: block;
     margin-bottom: 12px;
   }
 
   label.general-owner {
     float: left;
   }
 
 
   label.general-owner+input {
     margin-left: 180px;
   }
 
   input#general-owner+span {
     width: 100px;
     display: inline-block;
   }
 
   input,
   select {
     width: 75% !important;
     margin: auto;
   }
   .payment-post-none {
     display: none;
   }
   .well {
     background: transparent;
     border: transparent;
     outline: none;
     box-shadow: none;
   }
 </style>
  
 <div>
   <div class="form-group">
     <label for="address_room ">Address Room *</label>
     <input value='${dataPost.address_room}' disabled type="text" class="form-control" name="address_room" id="address_room ">
     <small id="error-address_room" class="form-text text-muted"></small>
   </div>
   <div class="form-group">
     <label for="near_places ">Near any public places</label>
 
     <input value='${dataPost.near_places}' disabled type="text" class="form-control" name="near_places" id="near_places"
       aria-describedby="helpId" placeholder="Enter Near any public places">
 
     <small id="error-near_places" class="form-text text-muted"></small>
 
   </div>
   <div class="form-group">
     <label for="kind_room">Kind of Room</label>
     <select class="form-control" name="kind_room" id="kind_room" disabled>
       <option value='${dataPost.kind_room}' hidden>${dataPost.kind_room}</option>
       <option value='Motel Room'>Motel Room</option>
       <option value='Mini apartment'>Mini apartment</option>
       <option value='Whole house'>Whole house</option>
     </select>
   </div>
   <div class="form-group">
     <label for="number_room">Number of Room</label>
     <input value='${dataPost.number_room}' disabled type="number" class="form-control" name="number_room" id="c"
       aria-describedby="helpId" placeholder="Enter Number of Room">
     <small id="error-number_room" class="form-text text-muted"></small>
   </div>
 
   <div class="form-group">
     <label for="price">Prices</label>
     <input value='${dataPost.price}' disabled type="text" class="form-control" name="price" id="price" aria-describedby="helpId"
       placeholder="Enter Near any public price month/quarter/year">
     <small id="error-price" class="form-text text-muted"></small>
   </div>
 
 
   <div class="form-group">
     <label for="area">Area</label>
     <input value='${dataPost.area}' disabled type="number" class="form-control" name="area" id="area" aria-describedby="helpId"
       placeholder="Enter Area">
     <small id="error-area" class="form-text text-muted"></small>
   </div>
   <div class="form-group">
     <label for="general_owner">General owner</label>
     <select class="form-control" name="general_owner" disabled id="general_owner">
       <option value= '${dataPost.general_owner}' hidden>${dataPost.general_owner}</option>
       <option value= 'Yes' >Yes</option>
       <option value= 'No' >No</option>
     </select>
   </div>
   <div class="form-group">
     <div class="row">
       <h2 class="col-sm-12">Physical facilities</h2>
       <div class="col-sm-6">
         <label for="bathroom">Bathroom *</label>
         <select class="form-control" name="bathroom" disabled id="bathroom">
           <option value= '${dataPost.bathroom}' hidden>${dataPost.bathroom}</option>
 
           <option value= 'Closed'>Closed</option>
           <option value= 'General'>General</option>
         </select>
       </div><!-- ennd col-6 -->
       <div class="col-sm-6">
         <label for="hot_cold_bottles">Hot and cold bottles *</label>
         <select class="form-control" disabled name="hot_cold_bottles" id="hot_cold_bottles">
           <option value= '${dataPost.hot_cold_bottles}' hidden>${dataPost.hot_cold_bottles}</option>
           <option value= 'Yes'>Yes</option>
           <option value= 'No'>No</option>
         </select>
       </div>
       <div class="col-sm-6">
         <label for="kitchen">Kitchen Room</label>
         <select class="form-control" disabled name="kitchen" id="kitchen">
           <option value= '${dataPost.kitchen}' hidden>${dataPost.kitchen}</option>
           <option value= 'Closed'>Closed</option>
           <option value= 'General'>General</option>
         </select>
       </div><!-- ennd col-6 -->
       <div class="col-sm-6">
         <label for="cooking">Cooking</label>
         <select class="form-control" disabled name="cooking" id="cooking">
           <option value= '${dataPost.cooking}' hidden>${dataPost.cooking}</option>
           <option value= 'Yes' >Yes</option>
           <option value= 'No' >No</option>
         </select>
       </div><!-- ennd col-6 -->
       <div class="col-sm-6">
         <label for="conditioning">Air Conditioning</label>
         <select class="form-control" disabled name="conditioning" id="conditioning">
           <option value= '${dataPost.conditioning}' hidden>${dataPost.conditioning}</option>
           <option value= 'Yes' >Yes</option>
           <option value= 'No' >No</option>
         </select>
       </div><!-- ennd col-6 -->
       <div class="col-sm-6">
         <label for="balcony">Balcony</label>
         <select class="form-control" disabled name="balcony" id="balcony">
           <option value= '${dataPost.balcony}' hidden>${dataPost.balcony}</option>
           <option value= 'Yes' >Yes</option>
           <option value= 'No' >No</option>
         </select>
       </div><!-- ennd col-6 -->
       <div class="col-sm-6">
         <div class="row">
           <div class="col-sm-6">
             <label for="electricity_price">Electricity Price</label>
             <input value='${dataPost.electricity_price}' disabled type="number" class="form-control" name="electricity_price"
               id="electricity_price " aria-describedby="helpId" placeholder="Electricity Price ">
             <small id="error-electricity_price" class="form-text text-muted"></small>
           </div>
           <div class="col-sm-6">
             <label for="water_price">Water Price</label>
             <input value='${dataPost.water_price}' disabled type="number" class="form-control" name="water_price"
               id="water_price " aria-describedby="helpId" placeholder="Water Price ">
             <small id="error-water_price" class="form-text text-muted"></small>
           </div>
         </div>
       </div><!-- ennd col-6 -->
       <div class="col-sm-6">
         <label for="other_utility">Other Utility</label>
         <input value='${dataPost.other_utility}' disabled type="text" class="form-control" name="other_utility"
           id="other_utility " aria-describedby="helpId"
           placeholder="Refrigerator / Washing machine / Bed cabinet etc...">
         <small id="error-other_utility" class="form-text text-muted"></small>
       </div><!-- ennd col-6 -->
     </div>
   </div> 
   <div class="form-group">
     <label for="time_post">Time the post shows up</label>
     <select class="form-control" name="time_post"  id="time_post">
       <option value= '${dataPost.time_post}' hidden>${dataPost.time_post}</option>
       <option value= '7' >7</option>
       <option value= '30'>30 </option>
       <option value= '90'>90</option>
       <option value= '365'>365</option>
     </select>
   </div>
   <div class="  paymentDetail">
 
   </div>
   
 </div>
         <div class="modal-footer save-changes-update">
           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           <button onClick=handlePaymentPost.call(this) data-status = '${dataPost.status}' data-id = "${dataPost._id}" data-images =  ${dataPost.images_room}  type="button" class="btn btn-primary payment-edit">Payment</button>
         </div>
 `;
    $('.content-update').append(template);
  }).catch((error) => {
    console.log(error);
  })
}


function handleEditPost() {
  // cho vao model:  .content-update
  var idPost = $(this).attr("data-id");
  $.ajax({
    ///detail-post/:idPost
    method: 'GET',
    url: "/owners/detail-post/" + idPost
  }).then((result) => {
    var { dataPost } = result;
    $('.content-update').empty();
    template = `
      
<style>
  * {
    margin: 0;
    padding: 0
  }

  .images-detail .image-room {
    width: 20%;

  }

  label.hot-cold-bottles {
    display: block;
    margin-bottom: 12px;
  }

  label.general-owner {
    float: left;
  }


  label.general-owner+input {
    margin-left: 180px;
  }

  input#general-owner+span {
    width: 100px;
    display: inline-block;
  }

  input,
  select {
    width: 75% !important;
    margin: auto;
  }
  .payment-post-none {
    display: none;
  }
  .well {
    background: transparent;
    border: transparent;
    outline: none;
    box-shadow: none;
  }
</style>
 
<div>
  <div class="form-group">
    <label for="address_room ">Address Room *</label>
    <input value='${dataPost.address_room}' type="text" class="form-control" name="address_room" id="address_room ">
    <small id="error-address_room" class="form-text text-muted"></small>
  </div>
  <div class="form-group">
    <label for="near_places ">Near any public places</label>

    <input value='${dataPost.near_places}' type="text" class="form-control" name="near_places" id="near_places"
      aria-describedby="helpId" placeholder="Enter Near any public places">

    <small id="error-near_places" class="form-text text-muted"></small>

  </div>
  <div class="form-group">
    <label for="kind_room">Kind of Room</label>
    <select class="form-control" name="kind_room" id="kind_room">
      <option value='${dataPost.kind_room}' hidden>${dataPost.kind_room}</option>
      <option value='Motel Room'>Motel Room</option>
      <option value='Mini apartment'>Mini apartment</option>
      <option value='Whole house'>Whole house</option>
    </select>
  </div>
  <div class="form-group">
    <label for="number_room">Number of Room</label>
    <input value='${dataPost.number_room}' type="number" class="form-control" name="number_room" id="c"
      aria-describedby="helpId" placeholder="Enter Number of Room">
    <small id="error-number_room" class="form-text text-muted"></small>
  </div>

  <div class="form-group">
    <label for="price">Prices</label>
    <input value='${dataPost.price}' type="text" class="form-control" name="price" id="price" aria-describedby="helpId"
      placeholder="Enter Near any public price month/quarter/year">
    <small id="error-price" class="form-text text-muted"></small>
  </div>


  <div class="form-group">
    <label for="area">Area</label>
    <input value='${dataPost.area}' type="number" class="form-control" name="area" id="area" aria-describedby="helpId"
      placeholder="Enter Area">
    <small id="error-area" class="form-text text-muted"></small>
  </div>
  <div class="form-group">
    <label for="general_owner">General owner</label>
    <select class="form-control" name="general_owner" id="general_owner">
      <option value= '${dataPost.general_owner}' hidden>${dataPost.general_owner}</option>
      <option value= 'Yes' >Yes</option>
      <option value= 'No' >No</option>
    </select>
  </div>
  <div class="form-group">
    <div class="row">
      <h2 class="col-sm-12">Physical facilities</h2>
      <div class="col-sm-6">
        <label for="bathroom">Bathroom *</label>
        <select class="form-control" name="bathroom" id="bathroom">
          <option value= '${dataPost.bathroom}' hidden>${dataPost.bathroom}</option>

          <option value= 'Closed'>Closed</option>
          <option value= 'General'>General</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="hot_cold_bottles">Hot and cold bottles *</label>
        <select class="form-control" name="hot_cold_bottles" id="hot_cold_bottles">
          <option value= '${dataPost.hot_cold_bottles}' hidden>${dataPost.hot_cold_bottles}</option>
          <option value= 'Yes'>Yes</option>
          <option value= 'No'>No</option>
        </select>
      </div>
      <div class="col-sm-6">
        <label for="kitchen">Kitchen Room</label>
        <select class="form-control" name="kitchen" id="kitchen">
          <option value= '${dataPost.kitchen}' hidden>${dataPost.kitchen}</option>
          <option value= 'Closed'>Closed</option>
          <option value= 'General'>General</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="cooking">Cooking</label>
        <select class="form-control" name="cooking" id="cooking">
          <option value= '${dataPost.cooking}' hidden>${dataPost.cooking}</option>
          <option value= 'Yes' >Yes</option>
          <option value= 'No' >No</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="conditioning">Air Conditioning</label>
        <select class="form-control" name="conditioning" id="conditioning">
          <option value= '${dataPost.conditioning}' hidden>${dataPost.conditioning}</option>
          <option value= 'Yes' >Yes</option>
          <option value= 'No' >No</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="balcony">Balcony</label>
        <select class="form-control" name="balcony" id="balcony">
          <option value= '${dataPost.balcony}' hidden>${dataPost.balcony}</option>
          <option value= 'Yes' >Yes</option>
          <option value= 'No' >No</option>
        </select>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-6">
            <label for="electricity_price">Electricity Price</label>
            <input value='${dataPost.electricity_price}' type="number" class="form-control" name="electricity_price"
              id="electricity_price " aria-describedby="helpId" placeholder="Electricity Price ">
            <small id="error-electricity_price" class="form-text text-muted"></small>
          </div>
          <div class="col-sm-6">
            <label for="water_price">Water Price</label>
            <input value='${dataPost.water_price}' type="number" class="form-control" name="water_price"
              id="water_price " aria-describedby="helpId" placeholder="Water Price ">
            <small id="error-water_price" class="form-text text-muted"></small>
          </div>
        </div>
      </div><!-- ennd col-6 -->
      <div class="col-sm-6">
        <label for="other_utility">Other Utility</label>
        <input value='${dataPost.other_utility}' type="text" class="form-control" name="other_utility"
          id="other_utility " aria-describedby="helpId"
          placeholder="Refrigerator / Washing machine / Bed cabinet etc...">
        <small id="error-other_utility" class="form-text text-muted"></small>
      </div><!-- ennd col-6 -->
    </div>
  </div> 
  <div class="form-group">
    <label for="time_post">Time the post shows up</label>
    <select class="form-control" name="time_post" id="time_post">
      <option value= '${dataPost.time_post}' hidden>${dataPost.time_post}</option>
      <option value= '7' >7</option>
      <option value= '30'>30 </option>
      <option value= '90'>90</option>
      <option value= '365'>365</option>
    </select>
  </div>
  <div class="  paymentDetail">

  </div>
  
</div>
        <div class="modal-footer save-changes-update">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button onClick=handlePaymentPost.call(this) data-id = "${dataPost._id}" data-images =  ${dataPost.images_room}  type="button" class="btn btn-primary payment-edit">Payment</button>
        </div>
`;
    $('.content-update').append(template);
  }).catch((error) => {
    console.log(error);
  })
}
{/*  */ }

function handlePaymentPost() {
  var time_post = $('select[name="time_post"]').val();
  var idPost = $(this).attr('data-id');
  var statusPost = $(this).attr('data-status');
  var images_room = $(this).attr('data-images');
  $.ajax({
    method: 'GET',
    url: '/users/user-detail'
  }).then((result) => {
    var { dataUser } = result;
    const price = 2;
    console.log(time_post);
    var template = `
    <div class="container" style="width:100%">
    <div class="row">
      <div class="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-6">
            <address>
              <strong>Chi tiết hóa đơn</strong>
              <br>
              ${dataUser.address}
              <br> 
              <abbr title="Phone" >0${dataUser.phone}
            </address>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 text-right">
            <p>
              <em>Ngày:${new Date().toLocaleDateString()}</em>
            </p> 
          </div>
        </div>
        <div class="row">
          <div class="text-center">
            <h1>Hóa Đơn</h1>
          </div>
          </span>
          <table class="table table-hover ">
            <thead>
            <tr>
               <th></th>
              <th>Số ngày</th>
               <th class="text-center">Giá / Ngày</th>
               <th class="text-center">Tổng cộng</th>
            </tr>
            </thead>
            <tbody class='text-center' >
              <tr>
              <td class="col-md-9"><em>Thời gian bài viết</em></h4>
                </td>
                <td class="col-md-1" style="text-align: center"> ${time_post} </td>
                <td class="col-md-1 text-center">$${price}</td>
                <td class="col-md-1 text-center">$${price * time_post}</td>
              </tr> 
              <tr>
                <td>   </td>
                <td>   </td>
                <td class="text-right">
                  <p>
                    <strong>Tổng cộng: </strong>
                  </p>
                  <p>
                    <strong>Thuế: </strong>
                  </p>
                </td>
                <td class="text-center">
                  <p>
                    <strong>$${price * time_post}</strong>
                  </p>
                  <p>
                    <strong>$${Math.round((price * time_post * 0.1) * 100) / 100} </strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td>   </td>
                <td>   </td>
                <td class="text-right">
                  <h4><strong>Tổng tiền: </strong></h4>
                </td>
                <td class="text-center text-danger">
                  <h4><strong>$${price * time_post * 0.1 + price * time_post} </strong></h4>
                </td>
              </tr>
            </tbody>
          </table> 
          
        </div>
      </div>
    </div>
    </div>
      `
    $(".paymentDetail").append(template);
    $("button.payment-edit").addClass('payment-post-none');
    $(".save-changes-update").append(`
    <button onClick=handleSavePost.call(this) data-id = "${idPost}" data-status = '${statusPost}' data-images = ' ${images_room}'  type="button" class="btn btn-primary">Save changes<i class="fas fa-chevron-right"></i></button>
    `)
    $('select').attr('disabled', true);
  }).catch((error) => {
  })
}


function handleSavePost() {
  var statusPost = $(this).attr('data-status');
  var idPost = $(this).attr('data-id');
  var images_room = $(this).attr('data-images');

  var address_room = $('input[name="address_room"]').val();
  var near_places = $('input[name="near_places"]').val();
  var kind_room = $('select[name="kind_room"]').val();
  var number_room = $('input[name="number_room"]').val();
  var price = $('input[name="price"]').val();
  var area = $('input[name="area"]').val();
  var general_owner = $('select[name="general_owner"]').val();
  var bathroom = $('select[name="bathroom"]').val();
  var hot_cold_bottles = $('select[name="hot_cold_bottles"]').val();
  var kitchen = $('select[name="kitchen"]').val();
  var cooking = $('select[name="cooking"]').val();
  var conditioning = $('select[name="conditioning"]').val();
  var balcony = $('select[name="balcony"]').val();
  var electricity_price = $('input[name="electricity_price"]').val();
  var water_price = $('input[name="water_price"]').val();
  var other_utility = $('input[name="other_utility"]').val();
  var time_post = $('select[name="time_post"]').val();
  if (statusPost === 'expired') {
    // Khi Bấm vào nó sẽ đổi thành về pending để chờ admin phê duyệt
    $.ajax({
      method: 'put',
      url: '/owners/update-post-room/' + idPost,
      data: {
        address_room,
        kind_room,
        near_places,
        number_room,
        price,
        area,
        general_owner, bathroom,
        hot_cold_bottles, kitchen, cooking, conditioning,
        balcony,
        electricity_price,
        water_price,
        other_utility,
        time_post,
        images_room,
        status: 'pending'
      }
    }).then((result) => {
      if (!result.error && result.status === 200) {
        window.location.href = '/';
        alert('Bài viết đã được gia hạn. Chờ ADMIN phê duyệt');
      } else {
        alert(result.message);
      }
    }).catch((error) => {

    })
  } 
  $.ajax({
    method: 'put',
    url: '/owners/update-post-room/' + idPost,
    data: {
      address_room,
      kind_room,
      near_places,
      number_room,
      price,
      area,
      general_owner, bathroom,
      hot_cold_bottles, kitchen, cooking, conditioning,
      balcony,
      electricity_price,
      water_price,
      other_utility,
      time_post,
      images_room
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert('Bài viết đã được sửa. Chờ ADMIN phê duyệt');
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  }).catch((error) => {

  })
}

function handleDeletePost() {
  var idPost = $(this).attr("data-id");
  $.ajax({
    method: 'delete',
    url: "/owners/delete-post-room/" + idPost
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      $(this).parent().parent().empty();
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
}
function handleHiredPost() {
  var idPost = $(this).attr("data-id");
  var idOwner = $(this).attr("data-id-owner");
  var content = "đã được thuê";
  console.log(idPost);
  var rent_status = 'Hired';
  $.ajax({
    url: 'owners/update-post-room/' + idPost,
    method: 'put',
    data: { rent_status }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      result.message = 'Bạn đã cho thuê thành công';
      alert(result.message);
      $(this).parent().empty();
      window.location.href = '/table';
    } else {
      alert(result.message);
    }
  }).catch((error) => {
    console.log(error);
  })
  $.ajax({
    url: 'notify/create-notify',
    method: 'post',
    data: { idPost, idOwner, content }
  })
}
$('select').on('change', function () {
  $(this).attr('disabled', true);
});