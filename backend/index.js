const express = require("express");   // import thư viện Express để viết API/Server
const cors = require("cors");
const app = express();         // Tạo app/server backend chính
const userRouter = require('./routes/user.routes'); // Lấy file API user từ user.routes.js vào đây
const roomRouter = require("./routes/rooms.routes");
const accountRouter = require("./routes/account.routes");
const bookingRouter = require("./routes/booking.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const auth = require("./middlewares/auth");
const appointmentController = require("./controllers/appointment.controller");
const rentalRequestRoutes = require("./routes/rentalRequest.routes");


app.use(express.json()); // Middleware để parse JSON body của request, giúp chúng ta có thể đọc dữ liệu gửi lên từ client dưới dạng JSON
app.use(cors());
app.use('/users', userRouter); // gắn API user vào đường dẫn /users, nghĩa là khi có request đến /users thì sẽ được xử lý bởi userRouter
app.use("/rooms", roomRouter);
app.use("/account", accountRouter);
app.use("/bookings", bookingRouter);
app.use("/appointments", appointmentRoutes);
app.use( "/rental-requests", rentalRequestRoutes);
app.delete(
    "/appointments/:id",
    auth,
    appointmentController.deleteAppointment
);
app.listen(3000);  // Start the server on port 1200
    console.log("Server is running on port 3000");

