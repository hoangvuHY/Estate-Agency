getData();
function getData() {
  $.ajax({
    method: 'GET',
    url: '/users/user-detail'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var dataUser = result.dataUser;
      console.log(dataUser);
      var template = ` 
 
<style>
body {
  height: 100vh;
    background: url(../background-login-logout.gif);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: -29px;
    background-position-x: -5px;
}
 
.form-control:focus {
  box-shadow: none;
  border-color: #BA68C8
}
 
.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none
}
 
.profile-button:hover {
  background: #682773
}
 
.profile-button:focus {
  background: #682773;
  box-shadow: none
}
 
.profile-button:active {
  background: #682773;
  box-shadow: none
}
 
.back:hover {
  color: #682773;
  cursor: pointer
}
 
.labels {
  font-size: 11px
}
 
.add-experience:hover {
  background: #BA68C8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #BA68C8
}
 
 
</style>
 
 
<div class="container rounded bg-white mt-5 mb-5">
<div class="row">
  <div class="col-md-3 border-right">
    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5"
        src="https://bootdey.com/img/Content/avatar/avatar7.png"><span
        class="font-weight-bold">${dataUser.name}</span><span class="text-black-50">${dataUser.email}</span><span> </span></div>
  </div>
  <div class="col-md-5 border-right">
    <div class="p-3 py-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="text-right">Chỉnh sửa thông tin cá nhân</h4>
      </div>
      <div class="row mt-2">
        <div class="col-md-6"><label class="labels">Họ tên</label>
        <input value="${dataUser.name}" type="text" id="name" class="form-control">
        </div>
        <div class="col-md-6">
        <label for="phone">Điện thoại</label>
            <input  value="0${dataUser.phone}"  type="number" id="phone" class="form-control">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
        <label for="address">Địa chỉ</label>
        <input   value="${dataUser.address}"  type="text" id="address" class="form-control">
        <span id="errorAddress"></span>
        </div>
        <div class="col-md-12">
        <label for="username">Username </label>
        <input value="${dataUser.username}" type="text" id="username" class="form-control">
        <span id="errorUsername"></span>
        </div>
        <div class="col-md-12">
            <button onClick=handleSave.call(this) data-id= ${dataUser._id} class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
            id="btnSignin">Lưu</button>
        </div> 
      </div>
      <div class="row mt-3">
      <p>Is your profile?
      <a href="/profile-owner">Profile</a>
    </p>  
 
      </div>
    </div>
    
  </div>
  <div class="col-md-4 border-right">
    <div class="d-flex flex-column "><img style="width: 100%;height: 100%;"
        src="https://image.bnews.vn/MediaUpload/Org/2017/12/05/095418_cay-thong-noel.jpeg"><span
     
  </div>
</div>
</div>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
        `;
      $(".content").append(template);
    }
  }).catch((error) => {

  })
}

function handleSave() {
  console.log();
  var name = $('#name').val();
  var phone = $('#phone').val();
  var address = $('#address').val();
  var username = $('#username').val();
  var idOwner = $(this).attr("data-id");
  $.ajax({
    url: "/modify-owner/info-user",
    method: "POST",
    data: {
      name,
      phone,
      address,
      username,
      idOwner
    }
  })
    .then((result) => {
      if (!result.error && result.status === 200) {
        alert("Bạn cần chờ phê duyệt từ admin");
        window.location.href = '/waiting-for-approval'
      }
      if (result.error && result.status === 400) {
        alert(result.messageModify);
        window.location.href = '/waiting-for-approval'
      }
    })
  console.log(name, phone, address, username);
}
