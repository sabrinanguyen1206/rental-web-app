const rentalRequestModel =
require("../models/rentalRequest.model");

const createRequest = async (req, res) => {

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
    console.log(req.body); 
    
    const request =
    await rentalRequestModel.createRequest(
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

    return res.json(request);

};

const getAllRequests = async (req, res) => {

    const requests =
        await rentalRequestModel.getAllRequests();

    return res.json(requests);

};

const approveRequest = async (req, res) => {

    const id = req.params.id;

    const request =
        await rentalRequestModel.approveRequest(id);

    return res.json(request);

};

const deleteRequest = async (req, res) => {

    const request =
        await rentalRequestModel.deleteRequest(
            req.params.id
        );

    return res.json(request);
};

const rejectRequest = async (req, res) => {

    const { reason } = req.body;

    const request =
        await rentalRequestModel.rejectRequest(
            req.params.id,
            reason
        );

    return res.json(request);
};

module.exports = {
    createRequest,
    getAllRequests,
    approveRequest,
    deleteRequest,
    rejectRequest
};