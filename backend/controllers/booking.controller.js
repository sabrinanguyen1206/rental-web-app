const bookingModel = require("../models/booking.model");
const getBookings = async (req, res) => {
    const bookings = await bookingModel.getBookings(req.query);
    return res.json(bookings);
}

const getBookingById = async (req, res) => {
    const id = req.params.id;
    const booking = await bookingModel.getBookingById(id);
    return res.json(booking);
}

const createBooking = async (req, res) => {
    const user_id = req.user.id;
    const {
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
    } = req.body;

    const booking = await bookingModel.createBooking(
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
    );

    return res.json(booking);
};

module.exports = {
    createBooking
};

const updateBooking = async (req, res) => {
    const id = req.params.id;
    const { user_id, room_id, start_date, end_date } = req.body;
    const updatedBooking = await bookingModel.updateBooking(id, user_id, room_id, start_date, end_date);
    return res.json(updatedBooking);
}

const deleteBooking = async (req, res) => {
    const id = req.params.id;
    const deletedBooking = await bookingModel.deleteBooking(id);
    return res.json(deletedBooking);
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}