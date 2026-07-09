const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const rentalRequestController =
require("../controllers/rentalRequest.controller");

router.get(
    "/admin",
    rentalRequestController.getAllRequests
);

router.post(
    "/",
    auth,
    rentalRequestController.createRequest
);

router.put(
    "/:id/approve",
    rentalRequestController.approveRequest
);

router.delete(
    "/:id",
    rentalRequestController.deleteRequest
);

router.put(
    "/:id/reject",
    rentalRequestController.rejectRequest
);

module.exports = router;