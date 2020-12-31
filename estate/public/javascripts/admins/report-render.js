getData();
function getData() {
  $.ajax({
    method: 'GET',
    url: '/admin/all-reports'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var { allReports } = result;
      console.log(result);
      console.log(allReports);
      allReports.forEach((element) => {
        var template = ` 
              <tr>
                <td class ='name' >${element.idRenter.name}</td>
                <td class ='name' >${element.idPost}</td>
                <td class ='address'>${element.idRenter.address}</td>
                <td class ='phone'>0${element.idRenter.phone}</td> 
                <td>
                ${element.content}
                </td>
              </tr> `;

        $("#detailReports").append(template);
      })
    }

  }).catch((error) => {

  })

}
function handleAccepted() {
  var idModify = $(this).attr("data-id");
  var idOwner = $(this).attr("data-owner");
  var name = $(this).parent().parent().children("td.name").text();
  var address = $(this).parent().parent().children("td.address").text();
  var phone = $(this).parent().parent().children("td.phone").text();
  var username = $(this).parent().parent().children("td.username").text();
  $.ajax({
    url: '/admin/accept-owner/' + idModify,
    type: 'put',
    data: {
      idOwner, name, address, phone, username
    }
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      $(this).parent().empty();
    }
  }).catch((error) => {

  })

}
function handleCancel() {
  var idModify = $(this).attr("data-id");
  $.ajax({
    url: '/admin/cancel-owner/' + idModify,
    type: 'put',
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      $(this).parent().empty();
    }
  }).catch((error) => {

  })
}