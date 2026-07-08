const appointmentModel = require("../models/appointment.model");

const createAppointment = async (req, res) => {
    const {
        room_id,
        customer_name,
        phone,
        appointment_date,
        appointment_time,
        note
    } = req.body;

    const user_id = req.user.id;

    console.log("req.user =", req.user);
    console.log("user_id =", user_id);

    const appointment =
        await appointmentModel.createAppointment(
            user_id,
            room_id,
            customer_name,
            phone,
            appointment_date,
            appointment_time,
            note
        );

    return res.json(appointment);
};


const getAppointments = async (req, res) => {
    const userId = req.user.id;

    const appointments =
        await appointmentModel.getAppointments(userId);

    return res.json(appointments);
};

const getAllAppointments = async (req, res) => {
    try {

        const appointments =
            await appointmentModel.getAllAppointments();

        return res.json(appointments);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentModel.deleteAppointment(
            req.params.id,
            req.user.id
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Không tìm thấy lịch hẹn",
            });
        }

        return res.json({
            message: "Đã hủy lịch hẹn",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAllAppointments,
    deleteAppointment
};