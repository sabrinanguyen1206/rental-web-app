
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const room = ref(null);

const getRoom = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/rooms/${route.params.id}`
    );

    const data = await response.json();
    console.log('room api', data);
    room.value = data;
    
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getRoom();
});
</script>


<template>
    <div v-if="room" class="container">
  
      <img
        :src="room.image"
        class="cover-image"
      />
  
      <h1>{{ room.title }}</h1>
  
      <h2>
        {{ room.price.toLocaleString() }} đ/tháng
      </h2>
  
  <div class="actions">

    <button
      class="schedule-btn"
      @click="router.push(`/appointment/${room.id}`)"
    >
      Đặt lịch hẹn
    </button>

    <button
      class="booking-btn"
      @click="router.push('/register-room')"
    >
      Đăng ký thuê ở
    </button>

</div>
  
    </div>
  </template>


<style scoped>
.container {
  max-width: 1000px;
  margin: 50px auto;
}

button {
  padding: 15px 30px;
  background: #5ed8ee;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.actions{
    display:flex;
    gap:20px;

    margin-top:30px;
}

.booking-btn{
    flex:1;

    display:flex;
    justify-content:center;
    align-items:center;

    text-decoration:none;
    color:black;

    padding:15px 30px;
    background:#50e5ff;
    border:none;
    border-radius:10px;
    cursor:pointer;
}

.schedule-btn{
    flex:1;
    padding:15px 30px;
    background:#80e383;
    color:rgb(10, 10, 10);
    border:none;
    border-radius:10px;
    cursor:pointer;

    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
}

.cover-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 20px;
}


</style>