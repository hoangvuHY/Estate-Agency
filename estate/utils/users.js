
const users = [];

// Join user to chat
function userJoin(id, username, room) {
  // Thêm một user mới
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  // Tìm kiếm user có nằm trong mảng đó không. Trả về cái phần tử bằng với phần tử có id
  const index = users.findIndex(user => user.id === id);
  // Nếu có thì xóa nó đi 
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users: Lấy những user trong phòng đó
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}
// Tất cả đều lên server
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
