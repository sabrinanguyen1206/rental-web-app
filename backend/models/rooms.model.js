const pool = require("../config/db"); 

const getRooms = async (room) => {
    const title = room.title;
    const minPrice = room.minPrice;
    const maxPrice = room.maxPrice;

    let query = "SELECT * FROM rooms WHERE 1=1";
    const values = [];

    if (title) {
        values.push(`%${title}%`);
        query += ` AND title ILIKE $${values.length}`;
    }

    if (minPrice) {
        values.push(minPrice);
        query += ` AND price >= $${values.length}`;
    }

    if (maxPrice) {
        values.push(maxPrice);
        query += ` AND price <= $${values.length}`;
    }

    const result = await pool.query(query, values);

    return result.rows;
};

const getRoomImages = async (id) => {
    const result = await pool.query(
        `SELECT images.*             
         FROM room_images
         JOIN images
         ON room_images.image_id = images.id
         WHERE room_images.room_id = $1`,
        [id]
    );

    return result.rows;
};

const getRoomById = async (id) => {   // tạo hàm getRoomById để lấy thông tin room có id tương ứng
    const result = await pool.query(
        "SELECT * FROM rooms WHERE id = $1", 
        [id]     // lấy dữ liệu room có id tương ứng từ db
    );
    return result.rows[0];    // trả về dữ liệu room có id tương ứng về dạng JSON
    };

const createRoom = async (title, price) => {   // tạo hàm createRoom để thêm room mới vào db
    const result = await pool.query(
        "INSERT INTO rooms (title, price) VALUES ($1, $2) RETURNING *", 
        [title, price]     // Thêm dữ liệu title và capacity vào db rooms, và trả về dữ liệu room mới tạo   
    );
    return result.rows[0];   // trả về dữ liệu room mới được thêm vào dạng JSON
};

const updateRoom = async (id, title, price) => {    // tạo hàm updateRoom để cập nhật thông tin room có id tương ứng`
    const result = await pool.query(
        "UPDATE rooms SET title = $1, price = $2 WHERE id = $3 RETURNING *", 
        [title, price, id]     // Cập nhật dữ liệu title và capacity của room có id tương ứng trong db rooms, và trả về dữ liệu room đã được cập nhật
    );
    return result.rows[0];   // trả về dữ liệu room đã được cập nhật về dạng JSON
};

const deleteRoom = async (id) => {    // tạo hàm deleteRoom để xóa room có id tương ứng
    const result = await pool.query(
        "DELETE FROM rooms WHERE id = $1 RETURNING *", 
        [id]     // Xóa dữ liệu room có id tương ứng trong db rooms
    );
    return result.rows[0];   // trả về dữ liệu room đã được xóa về dạng JSON
};

module.exports = {
    getRooms,
    getRoomImages,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};



