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
    $("#errorPassword").text("Please enter password").show();
    $("#passwordRegister").focus();
    check = false;
  } else {
    //Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number: 
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!patternPassword.test(password)) {
      $("#errorPassword").text("Please enter right validation. Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number").show();
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
    $("#errorConfirmPassword").text("Please enter confirm Password").show();
    $("#confirmPassword").focus();
    check = false;
  } else {
    //Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number: HotBoy9x
    var patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!patternPassword.test(confirmPassword)) {
      $("#errorConfirmPassword").text("Please enter right validation. Have at least 8 characters including 1 uppercase, 1 lowercase letter and 1 number").show();
      $("#confirmPassword").focus();
      check = false;
    } else {
      if (password !== confirmPassword) {
        $("#errorConfirmPassword").text("Password does not match").show();
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
    $("#errorEmail").text("Please enter email").show();
    $("#email").focus();
    check = false;
  } else {
    var patternEmail = /^\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3}){1,2}$/
    if (!patternEmail.test(email)) {
      $("#errorEmail").text("Please enter right validation. Example: abc@gmail.com").show();
      $("#emailRegister").focus();
      check = false;
    } else {
      $("#errorEmail").css("display", 'none')
    }
  }

  //validation identification :
  var username = $("#username").val();
  if (username == '') {
    $("#errorUsername").text("Please enter Username").show();
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
    $("#errorIdentification").text("Please enter identification").show();
    $("#identification").focus();
    check = false;
  } else {
    var patternIdentification = /^\d{13}$/
    if (!patternIdentification.test(identification)) {
      $("#errorIdentification").text("Please enter right validation.Enough 13 number").show();
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
    $("#errorAddress").text("Please enter address").show();
    $("#address").focus();
    check = false;
  } else {
    var patternAddress = /^.+$/
    if (!patternAddress.test(address)) {
      $("#errorAddress").text("Please enter right validation").show();
      $("#address").focus();
      check = false;
    } else {
      $("#errorAddress").css("display", 'none')
    }
  }
  //validation Phone number
  var phone = $("#phone").val();
  if (phone == '') {
    $("#errorPhone").text("Please enter Phone").show();
    $("#phone").focus();
    check = false;
  } else {
    var patternPhone = /^0\d{9}$/
    if (!patternPhone.test(phone)) {
      $("#errorPhone").text("Please enter right validation. Example: start: 0 and total: 10").show();
      $("#phone").focus();
      check = false;
    } else {
      $("#errorPhone").css("display", 'none')
    }
  }
  //validation name :
  var name = $("#name").val();
  if (name == '') {
    $("#errorName").text("Please enter full name").show();
    $("#name").focus();
    check = false;
  } else {
    var patternName = /^\D+$/g
    if (!patternName.test(name)) {
      $("#errorName").text("Please enter right validation. Example: Hoàng Tuấn Vũ").show();
      $("#errorName").focus();
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