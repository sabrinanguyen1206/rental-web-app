<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const booking = ref({
  customer_name: "",
  citizen_id: "",
  phone: "",
  email: "",
  occupation: "",
  workplace: "",
  people_count: "",
  move_in_date: "",
  rental_period: "",
  purpose: "",
  note: ""
});

const submitBooking = async () => {
    console.log("Đã bấm nút");
    if (!booking.value.customer_name.trim()) {
        alert("Vui lòng nhập họ và tên.");
        return;
    }

    if (!booking.value.citizen_id.trim()) {
        alert("Vui lòng nhập CCCD.");
        return;
    }

    if (!booking.value.phone.trim()) {
        alert("Vui lòng nhập số điện thoại.");
        return;
    }

    if (!booking.value.email.trim()) {
        alert("Vui lòng nhập email.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(booking.value.email)) {
        alert("Email không hợp lệ.");
        return;
    }

    if (!booking.value.move_in_date) {
        alert("Vui lòng chọn ngày nhận phòng.");
        return;
    }
  try {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Vui lòng đăng nhập trước.");
        router.push("/login");
        return;
    }
    const response = await fetch("http://localhost:3000/rental-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
     },
      body: JSON.stringify({
        room_id: Number(route.params.id),
        ...booking.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
    alert(data.message || "Gửi yêu cầu thất bại");
    return;
}

    alert("Đã gửi yêu cầu thuê. Quản lý sẽ xem xét và phản hồi sớm.");
    booking.value = {
    customer_name: "",
    citizen_id: "",
    phone: "",
    email: "",
    occupation: "",
    workplace: "",
    people_count: "",
    move_in_date: "",
    rental_period: "",
    purpose: "",
    note: ""
};

    console.log(data);
  } catch (err) {
    console.log(err);
    alert("Có lỗi xảy ra");
  }
};
</script>


<template>

    <div class="container">

        <h1>Đăng ký thuê ở</h1>

        <input
        v-model="booking.customer_name"
        type="text"
        placeholder="Họ và tên"
        />

        <input
        v-model="booking.phone"
        type="text"
        placeholder="Số điện thoại"
        />

        <input
        v-model="booking.citizen_id"
        type="text"
        placeholder="CCCD"
        >

        <input
        v-model="booking.email"
        type="email"
        placeholder="Email"
        />

        <input
            v-model="booking.occupation"
            type="text"
            placeholder="Nghề nghiệp"
        />

        <input
            v-model="booking.workplace"
            type="text"
            placeholder="Nơi làm việc"
        />

        <input
            v-model="booking.people_count"
            type="number"
            placeholder="Số người dự kiến ở"
        />

        <input
            v-model="booking.move_in_date"
            type="date"
        />

        <input
        v-model="booking.rental_period"
            type="text"
            placeholder="Thời gian dự định thuê (VD: 12 tháng)"
        />

        <input
            v-model="booking.purpose"
            type="text"
            placeholder="Mục đích thuê"
        />

        <textarea
            v-model="booking.note"
            placeholder="Ghi chú"
        ></textarea>

        <button @click="submitBooking">
            Gửi yêu cầu
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

    border:1px solid #ddd;

    border-radius:10px;

    font-size:16px;
}

textarea{
    height:120px;
}

button{
    padding:15px;

    border:none;

    border-radius:10px;

    background:#50e5ff;

    cursor:pointer;

    font-size:18px;
}

</style>