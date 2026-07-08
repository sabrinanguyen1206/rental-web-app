<script setup>
import RoomCard from "../components/RoomCard.vue";

import { ref, computed, onMounted } from "vue";

const rooms = ref([])
const user = ref(null);
const showMenu = ref(false)

onMounted(async () => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
      user.value = JSON.parse(savedUser);
      console.log(user.value);
  }
  const response = await fetch("http://localhost:3000/rooms")
  const data = await response.json()
  console.log(data)
  
  rooms.value = data
  console.log(data)
})
const search = ref("")
const filteredRooms = computed(() => {
    return rooms.value.filter(room =>
        room.title.toLowerCase().includes(search.value.toLowerCase())
    )
})
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    user.value = null;
};

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

</script>

<template>

<div class="container">

<div class="header">

  <h1>Trang Chủ</h1>

  <div class="menu">

    <template v-if="!user">
        <router-link to="/login">
            <button>Đăng nhập</button>
        </router-link>

        <router-link to="/register">
            <button>Đăng ký</button>
        </router-link>
    </template>

    <template v-else>

<div class="user-menu">

  <div class="profile" @click="toggleMenu">

    <div class="avatar">
      {{ user.name[0] }}
    </div>

    <span>{{ user.name }}</span>

    <span class="arrow">▼</span>

  </div> 

  <div v-if="showMenu" class="dropdown">

    <p>👤 {{ user.name }}</p>

<hr>

<template v-if="user.role === 'admin'">

    <router-link to="/admin">
        <button>Dashboard</button>
    </router-link>

    <router-link to="/admin/rooms">
        <button>Quản lý phòng</button>
    </router-link>

    <router-link to="/admin/appointments">
        <button>Quản lý lịch hẹn</button>
    </router-link>

    <router-link to="/admin/bookings">
        <button>Quản lý đơn thuê</button>
    </router-link>

    <router-link to="/admin/users">
        <button>Quản lý User</button>
    </router-link>

</template>

<template v-else>

    <router-link to="/appointments">
        <button>Lịch hẹn của tôi</button>
    </router-link>

    <button>Đơn thuê phòng</button>

    <button>Cài đặt</button>

</template>

<button @click="logout">
    Đăng xuất
</button>

  </div>

</div>

</template>
</div>
</div>
<div class="hero">
    <div class="hero-content">
        <h1>Phòng trọ phù hợp với bạn </h1>

        <p>
          Đầy đủ dịch vụ, tiện nghi, an ninh, giá cả hợp lý. Đặc biệt gần khu công nghiệp, trường học, bệnh viện và các tiện ích khác.
        </p>
    </div>

    <div class="hero-image">
        <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            alt="room"
        />
    </div>
</div>

<input
  class="search"
  type="text"
  placeholder="🔍 Tìm kiếm phòng..."
  v-model="search"
>

<div class="room-list">

  <RoomCard
    v-for="room in filteredRooms"
    :key="room.id"
    :room="room"
  />

</div>
</div>

</template>


<style scoped>
.header{
    display:flex;
    justify-content:space-between;
    align-items:center;

    margin-bottom:30px;
}

.menu{
    display:flex;
    gap:15px;
}

.search{
    width:100%;
    padding:15px;

    font-size:18px;

    border-radius:15px;
    border:1px solid #ddd;

    margin-bottom:40px;
}

.room-list{
    display:flex;
    gap:30px;
    flex-wrap:wrap;
}

.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 1200px;
    margin: 30px auto;

    padding: 40px 60px;
    border-radius: 20px;
    background: #f8f9ff;
}

.hero-content {
    width: 100%;
}

.hero-content h1 {
    font-size: 56px;
    line-height: 1.2;
    color: #1f2d5a;
}

.hero-content h1 {
    font-size: 36px;
    max-width: 450px;
}

.hero-image {
    width: 35%;
}

.hero-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
}

* {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 40px;

    background: #f5f7ff;
    border-radius: 20px;

    box-sizing: border-box;
}

.hero-content {
  width: 55%;
}

.hero-image {
  width: 35%;
}

.hero-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.user-menu{
    position: relative;
}

.profile{
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.avatar{
    width: 42px;
    height: 42px;
    border-radius: 50%;

    background: #50e5ff;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-weight: bold;
    font-size: 18px;
}

.arrow{
    font-size: 12px;
}

.dropdown{
    position: absolute;
    top: 55px;
    right: 0;

    width: 250px;

    background: white;

    border-radius: 14px;

    box-shadow: 0 8px 25px rgba(0,0,0,.12);

    padding: 15px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    z-index: 999;
}

.dropdown p{
    margin:0;
    font-weight:600;
}

.dropdown hr{
    border:none;
    border-top:1px solid #eee;
}

.dropdown a{
    text-decoration:none;
}

.dropdown button{
    width:100%;
    padding:12px;

    border:none;
    border-radius:10px;

    background:white;

    text-align:left;

    cursor:pointer;

    transition:.2s;

    font-size:15px;
}

.dropdown button:hover{
    background:#eef6ff;
}

.dropdown button:last-child{
    color:#e53935;
}

.dropdown button:last-child:hover{
    background:#ffecec;
}
</style>