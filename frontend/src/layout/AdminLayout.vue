<script setup>
import { RouterView, RouterLink } from "vue-router";
const user = JSON.parse(localStorage.getItem("user"));
</script>

<template>
  <div class="layout">

    <aside class="sidebar">

      <div class="logo">
        <h2>StayHome</h2>
      </div>

      <nav class="menu">
        <RouterLink to="/admin">Dashboard</RouterLink>

        <RouterLink to="/admin/rooms">
          Quản lý phòng
        </RouterLink>

        <RouterLink to="/admin/appointments">
          Lịch hẹn
        </RouterLink>

        <RouterLink to="/admin/bookings">
          Đơn thuê
        </RouterLink>

        <RouterLink to="/admin/users">
          Người dùng
        </RouterLink>
      </nav>

      <div class="profile">

        <div class="avatar">
            {{ user.name[0] }}
        </div>

        <div>
          <strong>{{ user.name }}</strong>
          <p>Admin</p>
        </div>

      </div>

    </aside>

    <main class="content">

      <RouterView />

    </main>

  </div>
</template>

<style scoped>

.layout{
    display:flex;
    min-height:100vh;
    background:#f8fafc;
}

.sidebar{
    width:250px;
    background:white;
    border-right:1px solid #e5e7eb;

    padding:30px;

    display:flex;
    flex-direction:column;
}

.logo{
    margin-bottom:50px;
}

.menu{
    display:flex;
    flex-direction:column;
    gap:8px;
}

.menu a{

    text-decoration:none;

    color:#374151;

    padding:12px 16px;

    border-radius:12px;

    transition:.2s;
}

.menu a:hover{

    background:#eff6ff;

    color:#2563eb;

}

.router-link-active{

    background:#dbeafe;

    color:#2563eb !important;

    font-weight:600;

}

.profile{

    margin-top:auto;

    display:flex;

    gap:12px;

    align-items:center;

}

.avatar{

    width:42px;
    height:42px;

    border-radius:50%;

    background:#2563eb;

    color:white;

    display:flex;

    justify-content:center;

    align-items:center;

    font-weight:bold;

}

.profile p{

    margin:0;
    color:#6b7280;

}

.content{

    flex:1;

    padding:40px;

}

</style>