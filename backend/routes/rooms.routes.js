const express = require("express");
const router = express.Router();    // tạo nhóm chứa các API user

const rooms = require("../controllers/rooms.controller");   // lấy file controller user để gọi hàm getUsers từ controller vào đây

router.get("/", rooms.getRooms);
router.get("/:id/images", rooms.getRoomImages);
router.get("/:id", rooms.getRoomById);
router.post("/", rooms.createRoom);
router.put("/:id", rooms.updateRoom);
router.delete("/:id", rooms.deleteRoom);

module.exports = router;



