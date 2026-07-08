const pool = require("../config/db");

const createAppointment = async (
    user_id,
    room_id,
    customer_name,
    phone,
    appointment_date,
    appointment_time,
    note
) => {
    console.log("Model user_id =", user_id);
    const result = await pool.query(
        `
        INSERT INTO appointments
            (
            user_id,
            room_id,
            customer_name,
            phone,
            appointment_date,
            appointment_time,
            note
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [user_id, room_id, customer_name, phone, appointment_date, appointment_time, note]
    );

    return result.rows[0];
};

const getAppointments = async (userId) => {
    const result = await pool.query(
        `
        SELECT
        appointments.*,
        rooms.title,
        rooms.price
        FROM appointments
        JOIN rooms
        ON appointments.room_id = rooms.id
        WHERE appointments.user_id = $1
        ORDER BY appointment_date DESC
        `,
        [userId]
    );

    return result.rows;
};

const getAllAppointments = async () => {
    const result = await pool.query(
        `
        SELECT
            appointments.*,
            rooms.title,
            rooms.price
        FROM appointments
        JOIN rooms
            ON appointments.room_id = rooms.id
        ORDER BY appointment_date DESC
        `
    );

    return result.rows;
};

const deleteAppointment = async (appointmentId, userId) => {
    const result = await pool.query(
        `
        DELETE FROM appointments
        WHERE id = $1
        AND user_id = $2
        RETURNING *
        `,
        [appointmentId, userId]
    );

    return result.rows[0];
};

module.exports = {
    createAppointment,
    getAppointments,
    getAllAppointments,
    deleteAppointment
};