<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
console.log("AppointmentHistoryView loaded");
const appointments = ref([]);
const router = useRouter();

onMounted(async () => {
    console.log("Mounted");
    const token = localStorage.getItem("token");

    const response = await fetch(
  "http://localhost:3000/appointments",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  },
);


const data = await response.json();

console.log(data);

appointments.value = data;

});

const deleteAppointment = async (id) => {
    if (!confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
    return;
    }
    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:3000/appointments/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (response.ok) {

        appointments.value = appointments.value.filter(
            item => item.id !== id
        );

        alert("Đã hủy lịch hẹn");
    }
    };

</script>
<template>
    <div class="container">
    <h1>📅 Lịch hẹn của tôi</h1>

    <div v-if="appointments.length === 0">
        <h3>Bạn chưa có lịch hẹn nào.</h3>
    </div>

    <div
        v-else
        v-for="appointment in appointments"
        :key="appointment.id"
        class="card"
    >
    <div class="card-header">
    <div>
        <h2>🏠 {{ appointment.title }}</h2>

        <p class="price">
            💰 {{ appointment.price.toLocaleString() }} đ/tháng
        </p>
        </div>

        <span class="status">
                🟢 Đã đặt lịch
        </span>
        </div>

        <div class="info">
            <p>👤 <strong>Tên:</strong> {{ appointment.customer_name }}</p>

            <p>📞 {{ appointment.phone }}</p>

            <p>
            📅 {{ new Date(appointment.appointment_date).toLocaleDateString("vi-VN") }}
            🕒 {{ appointment.appointment_time }}
            </p>

            <p>
                📝 {{ appointment.note || "Không có ghi chú" }}
            </p>
        </div>

        <div class="actions">
            <button
                class="view-btn"
                @click="$router.push(`/room/${appointment.room_id}`)"
                >
                Xem phòng
            </button>

            <button
                class="cancel-btn"
                @click="deleteAppointment(appointment.id)"
            >
                Hủy lịch
            </button>
        </div>
    </div>

</div>
</template>

<style scoped>
.container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
}

h1 {
    margin-bottom: 30px;
}

.card {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: 0.2s;
}

.card:hover {
    transform: translateY(-3px);
}

.card p {
    margin: 12px 0;
    font-size: 17px;
}

.card-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:20px;
}

.price{
    color:#16a34a;
    font-size:18px;
    font-weight:bold;
    margin-top:8px;
}

.status{
    background:#dcfce7;
    color:#15803d;
    padding:8px 14px;
    border-radius:999px;
    font-size:14px;
    font-weight:600;
}

.info{
    margin-top:20px;
}

.actions{
    display:flex;
    gap:15px;
    margin-top:25px;
}

.view-btn{
    flex:1;
    padding:12px;
    background:#50e5ff;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-weight:600;
}

.cancel-btn{
    flex:1;
    padding:12px;
    background:#ffe5e5;
    color:#d32f2f;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-weight:600;
}

</style>