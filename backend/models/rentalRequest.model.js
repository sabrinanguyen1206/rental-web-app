const pool = require("../config/db");

const createRequest = async (
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
        INSERT INTO rental_requests
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

const getAllRequests = async () => {

    const result = await pool.query(
        `
        SELECT
            rental_requests.*,
            users.name,
            rooms.title
        FROM rental_requests
        LEFT JOIN users
        ON rental_requests.user_id = users.id
        LEFT JOIN rooms
        ON rental_requests.room_id = rooms.id
        ORDER BY rental_requests.created_at DESC
        `
    );

    return result.rows;

};

const approveRequest = async (id) => {

    const result = await pool.query(
        `
        UPDATE rental_requests
        SET status = 'approved'
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];

};

const deleteRequest = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM rental_requests
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

const rejectRequest = async (id, reason) => {

    const result = await pool.query(
        `
        UPDATE rental_requests
        SET
            status = 'rejected',
            reject_reason = $2
        WHERE id = $1
        RETURNING *
        `,
        [id, reason]
    );

    return result.rows[0];
};

module.exports = {
    createRequest,
    getAllRequests,
    approveRequest,
    deleteRequest,
    rejectRequest
};