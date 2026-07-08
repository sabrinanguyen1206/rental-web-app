const pool = require("../config/db");

const getBookings = async () => {  // tạo hàm getBooking để lấy thông tin booking từ db
    const result = await pool.query(
        "SELECT * FROM booking"     // lấy dữ liệu từ db bookings
    );
    return result.rows;      //trả dữ liệu booking về dạng JSON
}

const getBookingById = async (id) => {  // tạo hàm getBookingById để lấy thông tin booking có id tương ứng
    const result = await pool.query(
        "SELECT * FROM booking WHERE id = $1", 
        [id]     // lấy dữ liệu booking có id tương ứng từ db
    );
    return result.rows[0];    // trả về dữ liệu booking có id tương ứng về dạng JSON
}

const createBooking = async (
    user_id,
    room_id,
    customer_name,
    citizen_id,
    phone,
    email,
    occupation,
    workplace,
    people_count,
    move_in_date,
    rental_period,
    purpose,
    note
) => {
    const result = await pool.query(
        `
        INSERT INTO booking
        (
            user_id,
            room_id,
            customer_name,
            citizen_id,
            phone,
            email,
            occupation,
            workplace,
            people_count,
            move_in_date,
            rental_period,
            purpose,
            note
        )

        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
        )

        RETURNING *
        `,
        [
            user_id,
            room_id,
            customer_name,
            citizen_id,
            phone,
            email,
            occupation,
            workplace,
            people_count,
            move_in_date,
            rental_period,
            purpose,
            note
        ]
    );

    return result.rows[0];
};

const updateBooking = async (id, user_id, room_id, start_date, end_date) => {   // tạo hàm updateBooking để cập nhật thông tin booking có id tương ứng
    const result = await pool.query(
        "UPDATE booking SET user_id = $1, room_id = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *",
        [user_id, room_id, start_date, end_date, id]
    );
    return result.rows[0];   // trả về dữ liệu booking đã được cập nhật vào dạng JSON
}

const deleteBooking = async (id) => {   // tạo hàm deleteBooking để xóa booking có id tương ứng
    const result = await pool.query(
        "DELETE FROM booking WHERE id = $1 RETURNING *",
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