let PostRoom = require('../models/post_room.model');

let User = require('../models/user.model');


let createPostRoomService = (infoPost) => {
  return PostRoom.create(infoPost)
}
let postsOwnerService = (idOwner) => {
  return PostRoom.find({ idOwner });
}

// Tăng số lượt xem

async function addSeenPostService(idPost) {
  let post = await PostRoom.findOne({ _id: idPost });
  let seen_old = post.seen;
  let seen_new = seen_old + 1;
  // console.log(22, seen_old, seen_new);
  return PostRoom.updateOne({ _id: idPost }, { 'seen': seen_new });
}


// Lấy thông tin bài đăng ưa thích của người dùng
async function getFavoritePostService(idRenter) {
  console.log(11, idRenter);
  let info_owner = await User.findOne({ _id: idRenter }).populate('favorite_post');
  console.log(info_owner);
  let favorite_post_arr = info_owner.favorite_post;
  return { favorite_arr: favorite_post_arr }

}


// Lưu thông tin bài đang ưa thích của người dùng và tăng số lượt yeu thích của bài viết đó
async function saveFavoritePostService(idPost, idRenter) {

  let info_owner = await User.findOne({ _id: idRenter });
  let favorite_post_arr = info_owner.favorite_post;
  if (favorite_post_arr.indexOf(idPost) == -1) {
    favorite_post_arr.push(idPost);

    let post = await PostRoom.findOne({ _id: idPost });
    let like_old = post.like;
    let like_new = like_old + 1;
    await PostRoom.updateOne({ _id: idPost }, { 'like': like_new });

  }

  await User.updateOne({ _id: idRenter }, { favorite_post: favorite_post_arr });

  let _like = (await PostRoom.findOne({ _id: idPost })).like;

  console.log(_like);
  return { favorite_arr: favorite_post_arr, total_like: _like };
}


// Lấy thông tin chi tiết một bài đăng
let findPostService = (idPost) => {
  return PostRoom.findOne({ _id: idPost }).populate("idOwner");
}

let updatePostService = (idPost, object) => {
  return PostRoom.updateOne({ _id: idPost }, object);
}
let deletePostService = (idPost) => {
  return PostRoom.deleteOne({ _id: idPost });
}

let allPostsService = () => {
  return PostRoom.find().populate('idOwner');
}

// Lấy tất cả bài đăng
async function allPostService(n) {

  let distance = 6;
  let length = await PostRoom.find({ "status": "active" }).countDocuments();
  // cách viết nếu dùng await kết hợp với return, sau đó dùng kết quả trả về để return trực tiếp ra một kết quả.
  let kq = await PostRoom.find({}).populate("idOwner").skip(n).limit(6);
  return [kq, length, distance];
  // cách viết return trực tiếp ra một Promise, mà không cần dùng kết quả trả về.
  //  return PostRoom.find().populate("idOwner").skip(n).limit(6);
}

// Tìm kiếm thông tin
async function searchAllPostService(n, address_room, kind_room, general_owner, area_min, area_max, price_min, price_max, balcony, conditioning, hot_cold_bottles, other_utility) {

  let obj_search = {};
  if (address_room != "")
    obj_search.address_room = new RegExp(address_room.trim());

  if (kind_room != "")
    obj_search.kind_room = new RegExp(kind_room.trim());

  if (general_owner != "")
    obj_search.general_owner = new RegExp(general_owner.trim());

  if (other_utility != "")
    obj_search.other_utility = new RegExp(other_utility.trim());
  if (balcony != "No") obj_search.balcony = balcony;
  if (conditioning != "No") obj_search.conditioning = conditioning;
  if (hot_cold_bottles != "No") obj_search.hot_cold_bottles = hot_cold_bottles;
  obj_search.area = { '$gte': Number(area_min), '$lte': Number(area_max) };
  obj_search.price = { '$gte': Number(price_min) * 1000000, '$lte': Number(price_max) * 1000000 };
  obj_search.status = "active";
  console.log(22, obj_search);
  let distance = 6;
  let length = await PostRoom.find(obj_search).countDocuments();
  // cách viết nếu dùng await kết hợp với return, sau đó dùng kết quả trả về để return trực tiếp ra một kết quả.
  let kq = await PostRoom.find(obj_search).populate("idOwner").skip(n).limit(6);
  console.log(kq, length);
  return [kq, length, distance];
}

// Lấy danh sách các bài đăng gần đây
let allPostRecentService = () => {
  return PostRoom.find({ "status": "active" }).sort('-createdAt').populate("idOwner").limit(6);
}
// Lấy số lượng bài đăng của các tỉnh
let allPostProvinceService = () => {
  return Promise.all([PostRoom.find({ "status": "active", "address_room": /Hồ Chí Minh/ }).countDocuments()
    , PostRoom.find({ "status": "active", "address_room": /Hà Nội/ }).countDocuments()
    , PostRoom.find({ "status": "active", "address_room": /Đà Nẵng/ }).countDocuments()
    , PostRoom.find({ "status": "active", "address_room": /Đồng Nai/ }).countDocuments()
    , PostRoom.find({ "status": "active", "address_room": /Bình Dương/ }).countDocuments()]);
};

let findPostProvinceService = (province) => {
  let regx = '/' + province + '/';
  let btcq = new RegExp(regx);
  return PostRoom.find({ 'address_room': btcq, 'status': 'active' });
}


module.exports = {
  createPostRoomService,
  postsOwnerService,
  allPostService,
  updatePostService,
  findPostService,
  deletePostService,
  allPostRecentService,
  allPostProvinceService,
  searchAllPostService,
  allPostsService,
  saveFavoritePostService,
  getFavoritePostService,
  addSeenPostService,
  findPostProvinceService
}

