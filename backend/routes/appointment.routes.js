const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const appointmentController =
require("../controllers/appointment.controller");

router.get(
    "/",
    appointmentController.getAppointments
);

router.get(
    "/admin",
    appointmentController.getAllAppointments
);

router.post(
    "/",
    auth,
    appointmentController.createAppointment
);

module.exports = router;