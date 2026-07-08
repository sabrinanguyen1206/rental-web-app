<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const name = ref("");
const phone = ref("");
const date = ref("");
const time = ref("");
const note = ref("");

const route = useRoute();
const submitAppointment = async () => {
    console.log("Submit clicked");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập trước.");
            return;
        }
        const response = await fetch(
            "http://localhost:3000/appointments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    room_id: Number(route.params.id),
                    customer_name: name.value,
                    phone: phone.value,
                    appointment_date: date.value,
                    appointment_time: time.value,
                    note: note.value,
                }),
            }
        );

        const data = await response.json();

        console.log(data);

        alert("Đặt lịch thành công!");
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra");
    }
};


</script>
<template>
    <div class="container">

        <h1>Hẹn lịch xem phòng</h1>

        <input
            type="text"
            placeholder="Họ và tên"
            v-model="name"
        >

        <input
            type="text"
            placeholder="Số điện thoại"
            v-model="phone"
        >

        <input
            type="date"
            v-model="date"
        >

        <input
            type="time"
            v-model="time"
        >

        <textarea
            placeholder="Ghi chú"
            v-model="note"
        ></textarea>

        <button @click="submitAppointment">
            Xác nhận lịch hẹn
        </button>

    </div>
</template>


<style scoped>

.container{
    max-width:600px;
    margin:50px auto;

    display:flex;
    flex-direction:column;
    gap:20px;
}

input,
textarea{
    padding:15px;
    border-radius:10px;
    border:1px solid #ddd;
}

button{
    padding:15px;
    background:#50e5ff;

    border:none;
    border-radius:10px;

    cursor:pointer;
}

</style>