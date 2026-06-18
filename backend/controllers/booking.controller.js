const userModel = require("../models/user.model");
const getBookings = async (req, res) => {
    const bookings = await userModel.getBookings(req.query);
    return res.json(bookings);
}

const getBookingById = async (req, res) => {
    const id = req.params.id;
    const booking = await userModel.getBookingById(id);
    return res.json(booking);
}

const createBooking = async (req, res) => {
    const { user_id, room_id, start_date, end_date } = req.body;
    const newBooking = await userModel.createBooking(user_id, room_id, start_date, end_date);
    return res.json(newBooking);
}

const updateBooking = async (req, res) => {
    const id = req.params.id;
    const { user_id, room_id, start_date, end_date } = req.body;
    const updatedBooking = await userModel.updateBooking(id, user_id, room_id, start_date, end_date);
    return res.json(updatedBooking);
}

const deleteBooking = async (req, res) => {
    const id = req.params.id;
    const deletedBooking = await userModel.deleteBooking(id);
    return res.json(deletedBooking);
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}