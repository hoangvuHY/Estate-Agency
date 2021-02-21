document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems);

});

// Or with jQuery

$(document).ready(function () {
  $('.datepicker').datepicker();
});

