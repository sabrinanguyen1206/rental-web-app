const pool = require("../config/db"); 
    
const getUsers = async (user) => {  // tạo hàm getUsers để lấy thông tin user từ db
  const role = user.role;
  const name = user.name;
  const email = user.email;

    if (role && name) {
        const result = await pool.query(
            "SELECT * FROM users WHERE role = $1 AND name ILIKE $2",
            [role, `%${name}%`]
        );
        return result.rows;
    }
  
    if (role) {
        const result = await pool.query(
            "SELECT * FROM users WHERE role = $1",
            [role]
        );
        return result.rows;
    }

    if (name) {
        const result = await pool.query(
            "SELECT * FROM users WHERE name ILIKE $1",
            [`%${name}%`]
        );
        return result.rows;
    }

    if (email) {
        const result = await pool.query(
            "SELECT * FROM users WHERE email ILIKE $1",
            [`%${email}%`]
        );
        return result.rows;
    }

    const result = await pool.query(
        "SELECT * FROM users"     // lấy dữ liệu từ db users
    );
    return result.rows;      //trả dữ liệu user về dạng JSON
}

const getUserById = async (id) => {  // tạo hàm getUserById để lấy thông tin user có id tương ứng
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [id]     // lấy dữ liệu user có id tương ứng từ db
    );
    return result.rows[0];    // trả về dữ liệu user có id tương ứng về dạng JSON
}

const createUser = async (name, email) => {   // tạo hàm createUser để thêm user mới vào db
    const result = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    ); 
    return result.rows[0];   // trả về dữ liệu user mới được thêm vào dạng JSON
}

const updateUser = async (id, name, email) => {   // tạo hàm updateUser để cập nhật thông tin user có id tương ứng
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
    );
    return result.rows[0];   // trả về dữ liệu user có id tương ứng sau khi được cập nhật dạng JSON
}

const deleteUser = async (id) => {   // tạo hàm deleteUser để xóa user có id tương ứng
    const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];   // trả về dữ liệu user có id tương ứng sau khi bị xóa dạng JSON
}

module.exports = {      // cho phép sử dụng hàm getUsers từ file này
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};