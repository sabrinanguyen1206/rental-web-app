const pool = require("../db");  // import pool từ db.js để kết nối với database

const getBookings = async () => {  // tạo hàm getBookings để lấy thông tin booking từ db
    const result = await pool.query(
        "SELECT * FROM bookings"     // lấy dữ liệu từ db bookings
    );
    return result.rows;      //trả dữ liệu booking về dạng JSON
}

const getBookingById = async (id) => {  // tạo hàm getBookingById để lấy thông tin booking có id tương ứng
    const result = await pool.query(
        "SELECT * FROM bookings WHERE id = $1", 
        [id]     // lấy dữ liệu booking có id tương ứng từ db
    );
    return result.rows[0];    // trả về dữ liệu booking có id tương ứng về dạng JSON
}

const createBooking = async (user_id, room_id, start_date, end_date) => {   // tạo hàm createBooking để thêm booking mới vào db
    const result = await pool.query(
        "INSERT INTO bookings (user_id, room_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, room_id, start_date, end_date]
    );
    return result.rows[0];   // trả về dữ liệu booking mới được thêm vào dạng JSON
}

const updateBooking = async (id, user_id, room_id, start_date, end_date) => {   // tạo hàm updateBooking để cập nhật thông tin booking có id tương ứng
    const result = await pool.query(
        "UPDATE bookings SET user_id = $1, room_id = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *",
        [user_id, room_id, start_date, end_date, id]
    );
    return result.rows[0];   // trả về dữ liệu booking đã được cập nhật vào dạng JSON
}

const deleteBooking = async (id) => {   // tạo hàm deleteBooking để xóa booking có id tương ứng
    const result = await pool.query(
        "DELETE FROM bookings WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];   // trả về dữ liệu booking đã được xóa vào dạng JSON
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}