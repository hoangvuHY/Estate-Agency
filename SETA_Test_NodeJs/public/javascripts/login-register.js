
$(document).ready(function () {
  $(".btn.submit-register-submit").click(registerUser);
  $(".btn.login-submit").click(loginUser);
});
const registerUser = async (e) => {
  e.preventDefault();
  const name = $(".name-register").val();
  const address = $(".address-register").val();
  const birthday = $(".birthday-register").val();
  const email = $(".email-register").val();
  const password = $(".password-register").val();
  const confirmPassword = $(".confirm-password-register").val();

  if (checkPassword(password, confirmPassword)) {
    await $.ajax({
      method: "post",
      url: "/users/register",
      data: {
        name, address, birthday, email, password
      }
    }).then((result) => {
      if (result.status === 200 && !result.error) {
        window.location.href = '/login';
        alert(result.message);
      } else {

        alert(result.message)
      }

    }).catch((err) => {
      console.error(err);
    });
  }

}
const checkPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    alert("Password không trùng khớp");
    $(".confirm-password-register").focus();
    return false;
  }
  return true;
}
const loginUser = async (e) => {
  e.preventDefault();
  const email = $(".email-login").val();
  const password = $(".password-login").val();

  await $.ajax({
    method: "post",
    url: "/users/login",
    data: {
      email, password
    }
  }).then((result) => {
    if (result.status === 200 && !result.error) {
      window.location.href = '/';
      alert(result.message);
    } else {

      alert(result.message)
    }
  }).catch((err) => {
    console.error(err);
  });
}
