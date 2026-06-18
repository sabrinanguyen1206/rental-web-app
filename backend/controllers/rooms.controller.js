const roomsModel = require("../models/rooms.model"); // lấy file model user để gọi hàm getUsers từ model vào đây
const getRooms = async (req, res) => {      // tạo hàm getUsers để xử lý request lấy thông tin user từ client gửi lên
     //let conditions = {};   // tạo object conditions để lưu các điều kiện cho API user
    // conditions.name = req.query.name || null;  // Lấy dữ liệu username từ query parameters của request gửi lên, nếu không có thì gán giá trị null
    //conditions.role = req.query.role || null;
    //const users = await userModel.getUsers(conditions);
    const rooms = await roomsModel.getRooms(req.query);
    return res.json(rooms);
}

const getRoomImages = async (req, res) => {
    const id = req.params.id;

    const images = await roomsModel.getRoomImages(id);

    return res.json(images);
}

const getRoomById = async (req, res) => {
    const id = req.params.id;

    const room = await roomsModel.getRoomById(id);

    return res.json(room);
};

const createRoom = async (req, res) => {
    const { title, price } = req.body;

    const newRoom = await roomsModel.createRoom(title, price);

    return res.json(newRoom);
}

const updateRoom = async (req, res) => {
    const id = req.params.id;
    const { title, price } = req.body;

    const updatedRoom = await roomsModel.updateRoom(id, title, price);

    return res.json(updatedRoom);
}

const deleteRoom = async (req, res) => {
    const id = req.params.id;

    await roomsModel.deleteRoom(id);

    return res.json({ message: "Room deleted successfully" });
}


module.exports = {
    getRooms,
    getRoomImages,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
}