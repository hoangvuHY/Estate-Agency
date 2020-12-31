const moment = require('moment');

function formatMessage(username, text) {
  // Hiện thông tin của bài
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
