let { allPostRecentService, allPostProvinceService, allPostService, findPostService, searchAllPostService } = require("../services/posterRoomService");


// Search bai viet
function searchAllPostController(req, res){
   let {n, address_room, kind_room, general_owner, area_min, area_max, price_min, price_max, balcony, conditioning, hot_cold_bottles, other_utility} = req.body;
  
  searchAllPostService(Number(n), address_room, kind_room, general_owner, area_min, area_max, price_min, price_max, balcony, conditioning, hot_cold_bottles, other_utility).then(function(result){
    if(result){
      return res.json({
          error: false,
          status: 200,
          message: "Tìm kiếm bài viết thành công",
          data: result
      })
    }else{
        return res.json({
            error: false,
            status: 200,
            message: "Không có bài viết nào"
        })
    }
  }).catch(function(err){
    return res.json({
      error: true,
      status: 500,
      message: "Lấy số lượng bài viết của các tỉnh không thành công"
    })
  })
}



// Lấy 6 bài đăng gần nhất
function getAllPostRecentControler(req, res){
  allPostRecentService().then(function(result){
    if(result){
        return res.json({
            error: false,
            status: 200,
            message: "Lấy tất cả bài viết gần đây thành công",
            data: result
        })
    }else{
        return res.json({
            error: false,
            status: 200,
            message: "Không có bài viết nào"
        })
    }
  }).catch(function(err){
    return res.json({
        error: true,
        status: 500,
        message: "Lấy tất cả bài viết gần đây không thành công"
    })
  })
}

// Lấy số lượng bài viết của mỗi tỉnh
function getAllPostProvinceControler(req, res){
  allPostProvinceService().then(function(result){
    return res.json({
      error: false,
      status: 200,
      message: "Lấy số lượng bài viết của các tỉnh thành công",
      data: result
    })
  }).catch(function(err){
    return res.json({
      error: true,
      status: 500,
      message: "Lấy số lượng bài viết của các tỉnh không thành công"
    })
  });
}

// Lấy tất cả các bài đăng
function getAllPostListController(req, res){
  console.log(typeof req.body.n);
  allPostService(Number(req.body.n)).then(function(result){
    if(result){
      return res.json({
          error: false,
          status: 200,
          message: "Lấy tất cả bài viết thành công",
          data: result
      })
  }else{
      return res.json({
          error: false,
          status: 200,
          message: "Không có bài viết nào"
      })
  }
  }).catch(function(err){
      return res.json({
        error: true,
        status: 500,
        message: "Lấy tất cả bài viết không thành công"
      })
  })
}

// Lấy thông tin chi tiết một bài đăng 
function getDetailPostController(req, res){
  findPostService(req.params.idPost).then(function(result){
    if(result){
      return res.json({
          error: false,
          status: 200,
          message: "Lấy chi tiết bài viết thành công",
          data: result
      })
  }else{
      return res.json({
          error: false,
          status: 200,
          message: "Không tồn tại bài viết"
      })
  }
  }).catch(function(err){
    return res.json({
      error: true,
      status: 500,
      message: "Lấy chi tiết bài đăng không thành công"
    })
  })
}

module.exports = {
   getAllPostRecentControler,
   getAllPostProvinceControler,
   getAllPostListController,
   getDetailPostController,
   searchAllPostController

 }