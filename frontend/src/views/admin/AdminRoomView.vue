<script setup>
import { ref, computed, onMounted } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";

const rooms = ref([]);
const showModal = ref(false);

const form = ref({
    title: "",
    price: "",
    status: "available",
    image: "",
});

const isEditing = ref(false);
const editingId = ref(null);

const loadRooms = async () => {
    const res = await fetch("http://localhost:3000/rooms");
    rooms.value = await res.json();
};

const saveRoom = async () => {

let url = "http://localhost:3000/rooms";

let method = "POST";

if (isEditing.value) {

    url = `http://localhost:3000/rooms/${editingId.value}`;

    method = "PUT";

}

console.log(JSON.stringify(form.value, null, 2));

const res = await fetch(url, {

    method,

    headers: {
        "Content-Type": "application/json",
    },

    body: JSON.stringify(form.value),

});

if (!res.ok) {

    alert("Lưu thất bại");

    return;

}

await loadRooms();

showModal.value = false;

isEditing.value = false;

editingId.value = null;

form.value = {

    title: "",

    price: "",

    status: "available",

    image: "",

};

};

const editRoom = (room) => {

isEditing.value = true;

editingId.value = room.id;

form.value = {
    title: room.title,
    price: room.price,
    status: room.status,
    image: room.image,
};

showModal.value = true;

};

const search = ref("");
const statusFilter = ref("all");

const filteredRooms = computed(() => {

return rooms.value.filter(room => {

    const matchSearch =
        room.title
            .toLowerCase()
            .includes(search.value.toLowerCase());

    const matchStatus =
        statusFilter.value === "all" ||
        room.status === statusFilter.value;

    return matchSearch && matchStatus;

});

});


onMounted(() => {
    loadRooms();
});

</script>

<template>

<div class="page">

    <div class="top">

        <div>

            <h1>Quản lý phòng</h1>

            <p>Quản lý tất cả phòng trong hệ thống</p>

        </div>

        <button
            class="add-btn"
            @click="showModal = true"
        >
            + Thêm phòng
        </button>

    </div>

    <div class="toolbar">

        <input
            v-model="search"
            type="text"
            placeholder="🔍 Tìm phòng..."
        />

        <select v-model="statusFilter">

            <option value="all">
                Tất cả
            </option>

            <option value="available">
                Còn trống
            </option>

            <option value="occupied">
                Đã thuê
            </option>

            <option value="maintenance">
                Bảo trì
            </option>

        </select>
    </div>

    <table>

        <thead>

            <tr>

                <th>Ảnh</th>
                <th>Tên phòng</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Chỉnh sửa</th>

            </tr>

        </thead>

        <tbody>

            <tr
                v-for="room in filteredRooms"
                :key="room.id"
            >

                <td>

                    <img
                        :src="room.image"
                        class="image"
                    >

                </td>

                <td>

                    {{ room.title }}

                </td>

                <td>

                    {{ room.price.toLocaleString() }}đ

                </td>

                <td>

                    <span
                        class="status"
                        :class="room.status"
                    >

                        {{
                            room.status === "available"
                                ? "Còn trống"
                                : room.status === "occupied"
                                ? "Đã thuê"
                                : "Bảo trì"
                        }}

                    </span>

                </td>

                <td>
                    <td>

                        <div class="actions">

                            <Pencil
                                :size="18"
                                @click="editRoom(room)"
                            />

                            <Trash2 :size="18" />

                        </div>

                    </td>
                </td>

            </tr>

        </tbody>

    </table>

</div>

<div
    v-if="showModal"
    class="modal-overlay"
>

    <div class="modal">

        <h2>

            {{ isEditing ? "Chỉnh sửa phòng" : "Thêm phòng" }}

        </h2>

        <input
            v-model="form.title"
            placeholder="Tên phòng"
        >

        <input
            v-model="form.price"
            type="number"
            placeholder="Giá"
        >

        <input
            v-model="form.image"
            placeholder="Link ảnh"
        >

        <select v-model="form.status">

            <option value="available">
                Còn trống
            </option>

            <option value="occupied">
                Đã thuê
            </option>

            <option value="maintenance">
                Bảo trì
            </option>

        </select>

        <div class="actions">

            <button
                class="cancel"
                @click="
                showModal = false;
                isEditing = false;
                editingId = null;
                "
            >
                Hủy
            </button>

            <button
                class="save"
                @click="saveRoom"
            >
                Lưu
            </button>

        </div>

    </div>

</div>

</template>

<style scoped>

.page{
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
    font-size:32px;
}

.top p{
    color:#64748b;
}

.add-btn{
    background:#2563eb;
    color:white;
    border:none;
    padding:14px 20px;
    border-radius:12px;
    cursor:pointer;
}

table{
    width:100%;
    background:white;
    border-radius:18px;
    border-collapse:collapse;
    overflow:hidden;
}

th{
    text-align:left;
    padding:18px;
    background:#f8fafc;
}

td{
    padding:18px;
    border-top:1px solid #eee;
}

.image{
    width:80px;
    height:60px;
    object-fit:cover;
    border-radius:10px;
}

.status{
    padding:6px 12px;
    border-radius:20px;
    font-size:14px;
    font-weight:600;
}

.status.available{
    background:#dcfce7;
    color:#15803d;
}

.status.occupied{
    background:#dbeafe;
    color:#eb2525;
}

.status.maintenance{
    background:#ffedd5;
    color:#ea580c;
}

.toolbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;
    margin-bottom:20px;
}

.toolbar input{
    width:320px;
    padding:12px 16px;
    border:1px solid #e2e8f0;
    border-radius:10px;
    outline:none;
}

.toolbar input:focus{
    border-color:#2563eb;
}

.toolbar select{
    padding:12px 16px;
    border:1px solid #e2e8f0;
    border-radius:10px;
}

.actions{
    display:flex;
    gap:12px;
    align-items:center;
}

.actions svg{
    cursor:pointer;
    color:#64748b;
}

.actions svg:hover{
    color:#2563eb;
}

.modal-overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.35);
    display:flex;
    justify-content:center;
    align-items:center;
}

.modal{
    width:420px;
    background:white;
    border-radius:18px;
    padding:25px;
    display:flex;
    flex-direction:column;
    gap:15px;
}

.modal input,
.modal select{
    padding:12px;
    border:1px solid #ddd;
    border-radius:10px;
}

.actions{
    display:flex;
    justify-content:flex-end;
    gap:10px;
}

.cancel{
    padding:10px 18px;
}

.save{
    background:#2563eb;
    color:white;
    border:none;
    padding:10px 18px;
    border-radius:8px;
}

</style>