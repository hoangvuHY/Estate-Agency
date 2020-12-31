getData();
function getData() {
  $.ajax({
    method: 'GET',
    url: '/admin/owner-verify'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var { dataOwner } = result;
      dataOwner.forEach((element) => {
        var template
        if (element.status === 'pending') {
          template = ` 
          <tr>
            <td class ='name' >${element.name}</td>
            <td  class ='address'>${element.address}</td>
            <td  class ='phone'>${element.phone}</td> 
            <td  class ='username'>${element.username}</td>
            <td >${element.status}</td>
            <td>
              <button onClick = handleAccepted.call(this) data-id = ${element._id} data-owner =${element.idOwner}  class="accepted btn-primary ">Accept</button>
              <button onClick = handleCancel.call(this)  class="cancel btn-danger"   data-id = ${element._id} data-owner =${element.idOwner}>Cancel</button>
            </td>
          </tr> 
                `
        } else {
          template = ` 
          <tr>
            <td class ='name' >${element.name}</td>
            <td  class ='address'>${element.address}</td>
            <td  class ='phone'>${element.phone}</td> 
            <td  class ='username'>${element.username}</td>
            <td >${element.status}</td> 
          </tr> 
                `
        }
        $("#detailOwners").append(template);
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