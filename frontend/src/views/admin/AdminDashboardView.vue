<script setup>
import { ref, onMounted } from "vue";
import RoomChart from "@/views/admin/RoomChart.vue";

import {
  House,
  CalendarDays,
  FileText,
  Users,
  Plus,
} from "lucide-vue-next";

const roomCount = ref(0);
const appointmentCount = ref(0);
const bookingCount = ref(0);
const userCount = ref(0);

const rooms = ref([]);

const availableCount = ref(0);
const occupiedCount = ref(0);

const rented = ref(38);
const available = ref(19);

onMounted(async () => {

    // Phòng
    const roomRes = await fetch("http://localhost:3000/rooms");
    const roomData = await roomRes.json();

    roomCount.value = roomData.length;
    rooms.value = roomData.slice(0, 4);

    // Nếu chưa có status thì tạm giả lập:
    // Giá > 3 triệu => đã thuê
    // Giá <= 3 triệu => còn trống

    occupiedCount.value = roomData.filter(
        room => room.price > 3000000
    ).length;

    availableCount.value = roomData.length - occupiedCount.value;

    // User
    const userRes = await fetch("http://localhost:3000/users");
    const userData = await userRes.json();

    userCount.value = userData.length;

    // Lịch hẹn
    const appointmentRes = await fetch(
    "http://localhost:3000/appointments/admin"
    );
    const appointmentData = await appointmentRes.json();

    appointmentCount.value = appointmentData.length;

    // Đơn thuê
    const bookingRes = await fetch("http://localhost:3000/bookings");
    const bookingData = await bookingRes.json();

    bookingCount.value = bookingData.length;

});

</script>

<template>

<div class="dashboard">

    <div class="top">

        <div>

            <h1>Quản lý hệ thống</h1>

        </div>

        <router-link to="/register-room">
            <button class="add-btn">
                <Plus :size="18" />
                <span>Thêm phòng</span>
            </button>
        </router-link>

    </div>

    <div class="cards">

        <div class="card">
            <House class="card-icon" />
            <h2>{{ roomCount }}</h2>
            <p>Phòng</p>
        </div>

        <div class="card">
            <CalendarDays class="card-icon" />
            <h2>{{ appointmentCount }}</h2>
            <p>Lịch hẹn</p>
        </div>

        <div class="card">
            <FileText class="card-icon" />
            <h2>{{ bookingCount }}</h2>
            <p>Đơn thuê</p>
        </div>

        <div class="card">
            <Users class="card-icon" />
            <h2>{{ userCount }}</h2>
            <p>Người dùng</p>
        </div>

    </div>

    <div class="dashboard-bottom">

        <div class="chart-card">

            <h2>Tình trạng phòng</h2>

            <RoomChart
            :occupied="occupiedCount"
            :available="availableCount"
        />

        </div>

        <div class="summary-card">

            <h2>Thống kê</h2>

            <div class="item">

                <span>Đã thuê</span>

                <strong>{{ rented }}</strong>

            </div>

            <div class="item">

                <span>Còn trống</span>

                <strong>{{ available }}</strong>

            </div>

            <div class="item">

                <span>Tổng phòng</span>

                <strong>{{ roomCount }}</strong>

            </div>

        </div>

        </div>

        <h2 class="section-title">
        Lịch hẹn gần đây
        </h2>

        <table class="appointment-table">

        <thead>

            <tr>

                <th>Khách</th>

                <th>Phòng</th>

                <th>Ngày</th>

                <th>Trạng thái</th>

            </tr>

        </thead>

        <tbody>

            <tr>

                <td>Ngọc</td>

                <td>A101</td>

                <td>02/07/2026</td>

                <td>

                    <span class="badge pending">

                        Chờ

                    </span>

                </td>

            </tr>

            <tr>

                <td>Lan</td>

                <td>A203</td>

                <td>03/07/2026</td>

                <td>

                    <span class="badge success">

                        Đã xác nhận

                    </span>

                </td>

            </tr>

        </tbody>

    </table>

</div>

</template>

<style scoped>

.dashboard{

    display:flex;
    flex-direction:column;
    gap:30px;

}

.top{

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.top h1{

    font-size:34px;

}

.top p{

    color:#64748b;

}

.top a{
    text-decoration: none;
}

.add-btn{

    background:#2563eb;

    color:white;

    border:none;

    padding:14px 22px;

    border-radius:12px;

    cursor:pointer;

}

.cards{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:20px;

}

.card{

    background:white;

    border-radius:20px;

    padding:25px;

    box-shadow:0 10px 30px rgba(0,0,0,.05);

}


.card h2{

    margin-top:15px;

    font-size:34px;

}

.card p{

    color:#64748b;

}

.room-grid{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:25px;

}

.room-card{

    background:white;

    border-radius:18px;

    overflow:hidden;

    box-shadow:0 10px 30px rgba(0,0,0,.05);

}

.room-card img{

    width:100%;

    height:180px;

    object-fit:cover;

}

.body{

    padding:18px;

}

.price{

    color:#2563eb;

    font-weight:bold;

}

.card-icon{
    width:32px;
    height:32px;
    color:#2563eb;
}

.add-btn{
    display:flex;
    align-items:center;
    gap:8px;
}

.dashboard-bottom{

display:grid;

grid-template-columns:2fr 1fr;

gap:30px;

}

.chart-card,
.summary-card{

background:white;

border-radius:20px;

padding:30px;

box-shadow:0 10px 25px rgba(0,0,0,.06);

}

.item{

display:flex;

justify-content:space-between;

margin:20px 0;

font-size:18px;

}

.section-title{

margin-top:20px;

}

.appointment-table{

width:100%;

border-collapse:collapse;

background:white;

border-radius:20px;

overflow:hidden;

box-shadow:0 10px 25px rgba(0,0,0,.06);

}

.appointment-table th{

text-align:left;

background:#f8fafc;

padding:18px;

}

.appointment-table td{

padding:18px;

border-top:1px solid #eee;

}

.badge{

padding:8px 14px;

border-radius:999px;

font-size:14px;

font-weight:600;

}

.pending{

background:#fef3c7;

color:#ca8a04;

}

.success{

background:#dcfce7;

color:#15803d;

}

</style>