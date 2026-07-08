const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const bookingController = require ("../controllers/booking.controller");
router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);
router.post("/", auth, bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;