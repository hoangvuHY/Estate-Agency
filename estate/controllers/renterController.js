let {findPostProvinceService, addSeenPostService, allPostRecentService, allPostProvinceService, allPostService, findPostService, searchAllPostService, saveFavoritePostService, getFavoritePostService } = require("../services/posterRoomService");
 
async function getFavoritePostController(req, res){
  await getFavoritePostService(req.body.idRenter).then(function(result){
    if(result){
        return res.json({
            error: false,
            status: 200,
            message: "Lấy bài viết đã lưu thành công",
            data: result
        })
    }else{
        return res.json({
            error: false,
            status: 200,
            message: "Không lấy được bài viết đã lưu"
        })
    }
  }).catch(function(err){
    return res.json({
        error: true,
        status: 500,
        message: "Lấy bài viết đã lưa không thành công"
    })
  })
    
}
 
 
// Tang so luot xem
function addSeenPostController(req, res){
  addSeenPostService(req.body.idPost).then(function(result){
    if(result){
      return res.json({
        error: false,
        status: 200,
        message: "Tăng lượt xem thành công",
        data: result
      })
    }else{
      return res.json({
        error: false,
        status: 200,
        message: "Không tăng được lượt xem",
       
      })
    }
  }).catch(function(err){
    return res.json({
      error: true,
      status: 500,
      message: "Tăng lượt xem thất bại",
    })
  })
}
 
 
 
// Luu bai viet
function saveFavoritePostController(req, res){
 
  saveFavoritePostService(req.body.idPost, req.body.idRenter).then(function(result){
    if(result){
        return res.json({
            error: false,
            status: 200,
            message: "Lưu bài viết thành công",
            data: result
        })
    }else{
        return res.json({
            error: false,
            status: 200,
            message: "Không lưu được bài viết"
        })
    }
  }).catch(function(err){
    return res.json({
        error: true,
        status: 500,
        message: "Lưu bài viết không thành công"
    })
  })
 
}
 
 
 
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
 
// Lay bai viet cua cac tinh
function findPostProvinceController(req, res){
  findPostProvinceService(req.body.province).then(function(result){
    return res.json({
      error: false,
      status: 200,
      message: "Lay bai viet cua cac tinh thanh cong",
      data: result
    })
  }).catch(function(err){
    return res.json({
      error: true,
      status: 500,
      message: "Lấy bài viết của các tỉnh không thành công"
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
   searchAllPostController,
   saveFavoritePostController,
   getFavoritePostController,
   addSeenPostController, 
   findPostProvinceController
   
 
 }
 
