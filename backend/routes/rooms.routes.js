const express = require("express");
const router = express.Router();    // tạo nhóm chứa các API user

const rooms = require("../controllers/rooms.controller");   // lấy file controller user để gọi hàm getUsers từ controller vào đây

router.get("/", rooms.controller.getRooms);   // tạo API get có đường dẫn /rooms, dùng để lấy thông tin tất cả các room   
router.get("/:id/images", rooms.controller.getRoomImages);   // tạo API get có đường dẫn /rooms/:id/images, trong đó :id là tham số động đại diện cho id của room cần lấy thông tin hình ảnh  
router.get("/:id", rooms.controller.getRoomById);   // tạo API get có đường dẫn /rooms/:id, trong đó :id là tham số động đại diện cho id của room cần lấy thông tin chi tiết  
router.post("/", rooms.controller.createRoom);   // tạo API post có đường dẫn /rooms, dùng để thêm room mới vào db
router.put("/:id", rooms.controller.updateRoom);    // tạo API put có đường dẫn /rooms/:id, dùng để cập nhật thông tin room có id tương ứng
router.delete("/:id", rooms.controller.deleteRoom); // tạo API delete có đường dẫn /rooms/:id, dùng để xóa room có id tương ứng

module.exports = router;



