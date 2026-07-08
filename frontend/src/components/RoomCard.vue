<template>
    <div class="room-card">

        <img
            :src="room.image"
            alt=""
            class="image"
        />

        <div class="content">
    <h2>{{ room.title }}</h2>

    <p>{{ room.price.toLocaleString() }} đ</p>

    <button @click="router.push(`/room/${room.id}`)">
        Xem chi tiết
</button>
</div>

</div>
  </template>
  
  <script setup>

  import { useRouter } from 'vue-router'

  defineProps({
    room: Object,
  })
  const router = useRouter()
  </script>
  
  <style scoped>
  .room-card {
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 15px;
    padding: 20px;
    background: white;
  }
  
  button {
    padding: 10px 20px;   
    background: #50e5ff;  
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .image {
    width: 100%;
    height: 220px;

    object-fit: cover;   
}
   
  </style>