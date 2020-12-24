/* const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
}); */
$("#btn-login").click((e) => {
  e.preventDefault();
  $.ajax({
    url: "auth/login",
    method: "post",
    data: {
      email: $("#email").val(),
      password: $("#password").val(),
    }
  }).then((data) => {
    if (!data.error && data.status === 200) {
      window.location.href = '/';
      alert(data.message);
    } else {
      alert(data.message);
    }
  })
})
$("#btn-register").click((e) => {
  e.preventDefault();
  var check = true;

  //validation Password
  var password = $("#passwordRegister").val();
  if (password == '') { 
    alert("Please enter password")
    $("#passwordRegister").focus();
    check = false;
  } else {
    //Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number: 
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!patternPassword.test(password)) { 
     
    alert("Please enter right validation. Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number")
     $("#passwordRegister").focus();
      check = false;
    } else {
      $("#errorPassword").css("display", 'none')
      $("#passwordRegister").css('background', '#E8F0FE');
    }
  }
  //validation Confirm Password
  var confirmPassword = $("#confirmPassword").val();
  if (confirmPassword == '') { 
    alert("Please enter confirm Password")
    $("#confirmPassword").focus();
    check = false;
  } else {
    //Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number: HotBoy9x
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!patternPassword.test(confirmPassword)) { 
      alert("Please enter right validation. Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number")
      $("#confirmPassword").focus();
      check = false;
    } else {
      if (password !== confirmPassword) { 
        alert("Password does not match")
        $("#confirmPassword").focus();
        check = false;
      }
      $("#errorConfirmPassword").css("display", 'none')
      $("#confirmPassword").css('background', '#E8F0FE');
    }
  }
  //validation Email
  var email = $("#emailRegister").val();
  if (email == '') { 
    alert("Please enter email")
    $("#email").focus();
    check = false;
  } else {
    var patternEmail = /^\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3}){1,2}$/
    if (!patternEmail.test(email)) { 
      alert("Please enter right validation. Example: abc@gmail.com")
      $("#emailRegister").focus();
      check = false;
    } else {
      $("#errorEmail").css("display", 'none')
    }
  }

  //validation identification :
  var username = $("#username").val();
  if (username == '') { 
    alert("Please enter Username")
    $("#username").focus();
    check = false;
  } else {
    /* var patternUsername = /^.+$/
    if (!patternUsername.test(username)) {
      $("#errorUsername").text("Please enter right Username").show();
      $("#username").focus();
      check = false;
    } else { */ 
    $("#errorUsername").css("display", 'none')
    $("#username").css('background', '#E8F0FE');
    /*  } */
  }
  //validation identification :
  var identification = $("#identification").val();
  if (identification == '') { 
    alert("Please enter identification")
    $("#identification").focus();
    check = false;
  } else {
    var patternIdentification = /^\d{12}$/
    if (!patternIdentification.test(identification)) { 
      alert("Please enter right validation.Enough 12 number")
      $("#identification").focus();
      check = false;
    } else {
      $("#errorIdentification").css("display", 'none')
      $("#identification").css('background', '#E8F0FE');
    }
  }

  //validation address
  var address = $("#address").val();
  if (address == '') { 
    alert("Please enter address")
    $("#address").focus();
    check = false;
  } else {
    var patternAddress = /^.+$/
    if (!patternAddress.test(address)) { 
      alert("Please enter right validation")
      $("#address").focus();
      check = false;
    } else {
      $("#errorAddress").css("display", 'none')
    }
  }
  //validation Phone number
  var phone = $("#phone").val();
  if (phone == '') { 
    $("#phone").focus();
    alert("Please enter Phone")
    check = false;
  } else {
    var patternPhone = /^0\d{9}$/
    if (!patternPhone.test(phone)) { 
      alert("Please enter right validation. Example: start: 0 and total: 10") 
      $("#phone").focus();
      check = false;
    } else {
      $("#errorPhone").css("display", 'none')
    }
  }
  //validation name :
  var name = $("#name").val();
  if (name == '') {
    alert("Please enter full name") 
    $("#name").focus();
    check = false;
  } else {
    var patternName = /^\D+$/g
    if (!patternName.test(name)) { 
      alert("Please enter right validation. Example: Hoàng Tuấn Vũ") 
      check = false;
    } else {
      $("#errorName").css("display", 'none')
    }
  }
  //pass: isBoy123
  //email: hoangvu@gmail.com
  //phone: 0369875216
  //identification: 1326597856985
  //name: Hoàng Tuấn Vũ
  if (check) {
    $.ajax({
      url: "auth/sign-up",
      method: "post",
      data: {
        email: $("#emailRegister").val(),
        name: $("#name").val(),
        birthday: $("#birthday").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        identification: $("#identification").val(),
        username: $("#username").val(),
        role: $("#role").val(),
        password: $("#passwordRegister").val(),
      }
    }).then((data) => {
      console.log(data);
      if (!data.error && data.status === 200) {
        window.location.href = '/login';
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
  }
}) 