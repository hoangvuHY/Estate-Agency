$("button.payment-post").click(() => {
  var time_post = $('select[name="time_post"]').val();
  $.ajax({
    method: 'GET',
    url: '/users/user-detail'
  }).then((result) => {
    var { dataUser } = result;
    const price = 2;
    console.log(typeof time_post);
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
          <button type="button" onClick=handleSubmitPost.call(this) class="btn btn-success btn-lg btn-inline-block ">
            Thanh toán ngay  <i class="fas fa-chevron-right"></i>
          </button></td>
        </div>
      </div>
    </div>
    </div>
      `
    $(".payment-content").append(template);
    $("button.payment-post").addClass('payment-post-none');
    $('select').attr('disabled', true);
  }).catch((error) => {
  })
})
function handleSubmitPost() {
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
  time_post = parseInt(time_post);
  $.ajax({
    url: '/owners/post-room',
    method: 'post',
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
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/';
    } else {
      alert(result.message);
      window.location.href = '/owners/poster-room';
    }
  }).catch((error) => {
    console.log(error);
  })
}
/* $('select').on('change', function () {
  $(this).attr('disabled', true);
}); */
getInfoOwner();
function getInfoOwner() {
  $.ajax({
    method: 'GET',
    url: '/users/user-detail'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var dataUser = result.dataUser;
      var template = ` 
      <h5 class="col-sm-6">Owner: <span>${dataUser.name}</span></h5>
      <h5 class="col-sm-6">Phone: <span>0${dataUser.phone}</span></h5>
      `;
      $("span.infoOwner").append(template);
    }
  }).catch((error) => {

  })
}
