getData();
function getData() {
  $.ajax({
    method: 'GET',
    url: '/admin/all-comments'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      var { allComments } = result;
      var template;
      allComments.forEach(element => {
        if (element.status === 'pending') {
          template = ` 
              <tr>
                <td >${element.idRenter.name}</td>
                <td >${element.idPost}</td>
                <td >${element.status}</td>
                <td >${element.content}</td> 
                <td>
                  <button onClick = handleAccepted.call(this) data-id = ${element._id} class="accepted btn-primary ">Accept</button>
                  <button onClick = handleCancel.call(this)  class="cancel btn-danger" data-id = ${element._id} >Cancel</button>
                </td>
              </tr> `;

        } else if (element.status === 'active') {
          template = ` 
          <tr>
            <td >${element.idRenter.name}</td>
            <td >${element.idPost}</td>
            <td >${element.status}</td>
            <td >${element.content}</td> 
          </tr> `;

        }

        $("#detailComments").append(template);
      })
    }

  }).catch((error) => {

  })

}

function handleAccepted() {
  var idComment = $(this).attr('data-id');
  $.ajax({
    url: '/admin/accept-comment/' + idComment,
    type: 'put'
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/comment-render';
    }
  }).catch((error) => {

  })

}
function handleCancel() {
  var idComment = $(this).attr('data-id');
  $.ajax({
    url: '/admin/cancel-comment/' + idComment,
    type: 'put',
  }).then((result) => {
    if (!result.error && result.status === 200) {
      alert(result.message);
      window.location.href = '/comment-render'
    }
  }).catch((error) => {

  })
}