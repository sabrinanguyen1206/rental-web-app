const pool = require("../config/db"); 

const getRooms = async (room) => {
    console.log("GET ROOMS RUNNING");
    const title = room.title;
    const minPrice = room.minPrice;
    const maxPrice = room.maxPrice;

    let query = `
    SELECT
        rooms.*,
        images.url AS image
    FROM rooms
    LEFT JOIN images
    ON rooms.cover_image_id = images.id
    WHERE 1=1
    `;
    const values = [];

    if (title) {
        values.push(`%${title}%`);
        query += ` AND rooms.title ILIKE $${values.length}`;
    }

    if (minPrice) {
        values.push(minPrice);
        query += ` AND price >= $${values.length}`;
    }

    if (maxPrice) {
        values.push(maxPrice);
        query += ` AND price <= $${values.length}`;
    }
    query += ` ORDER BY rooms.id ASC`;
    console.log(query);
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
        `
        SELECT
            rooms.*,
            images.url AS image
        FROM rooms
        LEFT JOIN images
        ON rooms.cover_image_id = images.id
        WHERE rooms.id = $1
        `,
        [id]
    );
    return result.rows[0];    // trả về dữ liệu room có id tương ứng về dạng JSON
    };

const createRoom = async (
        title,
        price,
        status,
        image
    ) => {
    
        // 1. Lưu ảnh
        const imageResult = await pool.query(
            `
            INSERT INTO images (url)
            VALUES ($1)
            RETURNING id
            `,
            [image]
        );
    
        const imageId = imageResult.rows[0].id;
    
        // 2. Tạo phòng
        const roomResult = await pool.query(
            `
            INSERT INTO rooms
            (
                title,
                price,
                status,
                cover_image_id
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING *
            `,
            [
                title,
                price,
                status,
                imageId
            ]
        );
    
        return roomResult.rows[0];
    
};

const updateRoom = async (
    id,
    title,
    price,
    status,
    image
) => {

    // 1. Cập nhật thông tin phòng
    const roomResult = await pool.query(
        `
        UPDATE rooms
        SET
            title = $1,
            price = $2,
            status = $3
        WHERE id = $4
        RETURNING *
        `,
        [
            title,
            price,
            status,
            id
        ]
    );

    // 2. Cập nhật ảnh đại diện
    await pool.query(
        `
        UPDATE images
        SET url = $1
        WHERE id = (
            SELECT cover_image_id
            FROM rooms
            WHERE id = $2
        )
        `,
        [
            image,
            id
        ]
    );

    return roomResult.rows[0];
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



