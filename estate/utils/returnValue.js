let caseSuccess = (res, message) => {
  return res.json({
    error: false,
    status: 200,
    message: message
  })
}
let caseErrorUser = (res, message) => {
  return res.json({
    error: true,
    status: 400,
    message: message
  })
}

let caseErrorServer = (res, message) => {
  return res.json({
    error: true,
    status: 500,
    message: message
  })
}

module.exports = {
  caseSuccess,
  caseErrorServer,
  caseErrorUser
}