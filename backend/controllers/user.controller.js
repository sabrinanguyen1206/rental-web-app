const userModel = require("../models/user.model"); // lấy file model user để gọi hàm getUsers từ model vào đây
const getUsers = async (req, res) => {      // tạo hàm getUsers để xử lý request lấy thông tin user từ client gửi lên
     //let conditions = {};   // tạo object conditions để lưu các điều kiện cho API user
    // conditions.name = req.query.name || null;  // Lấy dữ liệu username từ query parameters của request gửi lên, nếu không có thì gán giá trị null
    //conditions.role = req.query.role || null;
    //const users = await userModel.getUsers(conditions);
    const users = await userModel.getUsers(req.query);
    return res.json(users);
}

const getUserById = async (req, res) => {  // tạo hàm getUserById để xử lý request lấy thông tin user có id tương ứng từ client gửi lên
    const id = req.params.id;   // Lấy dữ liệu id từ path parameters của request gửi lên

    const user = await userModel.getUserById(id);  // Gọi hàm getUserById từ model để lấy thông tin user có id tương ứng

    return res.json(user);   // Trả về dữ liệu user có id tương ứng về dạng JSON
}

const createUser = async (req, res) => {   // tạo hàm createUser để xử lý request thêm user mới vào db từ client gửi lên
    const { name, email } = req.body;   // Lấy dữ liệu name và email từ body của request gửi lên

    const newUser = await userModel.createUser(name, email);  // Gọi hàm createUser từ model để thêm user mới vào db

    return res.json(newUser);  // Trả về dữ liệu user mới được thêm vào dạng JSON
}

const updateUser = async (req, res) => {   // tạo hàm updateUser để xử lý request cập nhật thông tin user có id tương ứng từ client gửi lên
    const id = req.params.id;   // Lấy dữ liệu id từ path parameters của request gửi lên
    const { name, email } = req.body;   // Lấy dữ liệu name và email từ body của request gửi lên

    const updatedUser = await userModel.updateUser(id, name, email);  // Gọi hàm updateUser từ model để cập nhật thông tin user có id tương ứng

    return res.json(updatedUser);  // Trả về dữ liệu user đã được cập nhật về dạng JSON
}

const deleteUser = async (req, res) => {   // tạo hàm deleteUser để xử lý request xóa user có id tương ứng từ client gửi lên
    const id = req.params.id;   // Lấy dữ liệu id từ path parameters của request gửi lên

    await userModel.deleteUser(id);  // Gọi hàm deleteUser từ model để xóa user có id tương ứng

    return res.json({ message: "User deleted successfully" });    // Trả về thông báo xóa user thành công về dạng JSON
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}