<script setup>
import { ref, onMounted, computed } from "vue";

import {
    Search,
    Eye,
    Check,
    X,
    Undo2,
    FileText,
    Trash2
} from "lucide-vue-next";

const requests = ref([]);

const keyword = ref("");

const statusFilter = ref("all");

const selectedRequest = ref(null);

const showDetailModal = ref(false);

const showRejectModal = ref(false);

const rejectReason = ref("");

const rejectId = ref(null);


const loadRequests = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:3000/rental-requests/admin",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    requests.value = await response.json();

};

const filteredRequests = computed(() => {

    return requests.value.filter((request) => {

        const matchKeyword =
            request.customer_name
                ?.toLowerCase()
                .includes(keyword.value.toLowerCase());

        const matchStatus =
            statusFilter.value === "all" ||
            request.status === statusFilter.value;

        return matchKeyword && matchStatus;

    });

});

const totalRequests = computed(() => requests.value.length);

const pendingRequests = computed(() =>
    requests.value.filter(r => r.status === "pending").length
);

const approvedRequests = computed(() =>
    requests.value.filter(r => r.status === "approved").length
);

const rejectedRequests = computed(() =>
    requests.value.filter(r => r.status === "rejected").length
);

const approveRequest = async (id) => {

    const token = localStorage.getItem("token");

    await fetch(
        `http://localhost:3000/rental-requests/${id}/approve`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    loadRequests();

};

const unapproveRequest = async (id) => {

    const token = localStorage.getItem("token");

    await fetch(
        `http://localhost:3000/rental-requests/${id}/unapprove`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    loadRequests();

};

const deleteRequest = async (id) => {

    if (!confirm("Bạn có chắc muốn xóa đơn thuê này?")) return;

    const token = localStorage.getItem("token");

    await fetch(
        `http://localhost:3000/rental-requests/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    loadRequests();

};

const viewRequest = (request) => {

    console.log(request);

    selectedRequest.value = request;

    showDetailModal.value = true;

};

const openContract = (request) => {

    console.log(request);

    // Sprint sau sẽ mở popup tạo hợp đồng

};

const formatDate = (date) => {
  if (!date) return "Không có";

  return new Date(date).toLocaleDateString("vi-VN");
};

const rejectRequest = async (id) => {

await fetch(
    `http://localhost:3000/rental-requests/${id}/reject`,
    {
        method: "PUT"
    }
);

loadRequests();
};

const openRejectModal = (id) => {

    rejectId.value = id;

    rejectReason.value = "";

    showRejectModal.value = true;

};

const confirmReject = async () => {

if (!rejectReason.value.trim()) {
    alert("Vui lòng nhập lý do từ chối.");
    return;
}

await fetch(
    `http://localhost:3000/rental-requests/${rejectId.value}/reject`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reason: rejectReason.value
        })
    }
);

showRejectModal.value = false;

loadRequests();

};

onMounted(loadRequests);
</script>



<template>
    <div class="page">

        <!-- Header -->
        <div class="top">

            <div>
                <h1>Quản lý đơn thuê</h1>
                <p>Theo dõi và xử lý các yêu cầu thuê phòng</p>
            </div>

        </div>

        <!-- Toolbar -->
        <div class="toolbar">

            <div class="search-box">

                <Search :size="18" class="search-icon" />

                <input
                    v-model="keyword"
                    type="text"
                    placeholder="Tìm theo tên khách..."
                />

            </div>

            <select v-model="statusFilter">

                <option value="all">
                    Tất cả
                </option>

                <option value="pending">
                    Chờ duyệt
                </option>

                <option value="approved">
                    Đã duyệt
                </option>

                <option value="rejected">
                    Đã từ chối
                </option>

            </select>

        </div>

        <div class="stats">

            <div class="stat-card">

                <div class="stat-title">
                    Tổng đơn
                </div>

                <div class="stat-number">
                    {{ totalRequests }}
                </div>

            </div>

            <div class="stat-card">

                <div class="stat-title">
                    Chờ duyệt
                </div>

                <div class="stat-number pending-text">
                    {{ pendingRequests }}
                </div>

            </div>

            <div class="stat-card">

                <div class="stat-title">
                    Đã duyệt
                </div>

                <div class="stat-number approved-text">
                    {{ approvedRequests }}
                </div>

            </div>

            <div class="stat-card">

                <div class="stat-title">
                    Đã từ chối
                </div>

                <div class="stat-number rejected-text">
                    {{ rejectedRequests }}
                </div>

            </div>

        </div>

        <!-- Table -->

        <table>

            <thead>

                <tr>

                    <th>Khách thuê</th>

                    <th>Phòng</th>

                    <th>Liên hệ</th>

                    <th>Trạng thái</th>

                    <th>Thao tác</th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-for="request in filteredRequests"
                    :key="request.id"
                >

                    <td>

                        <div class="customer">

                            <strong>

                                {{ request.customer_name }}

                            </strong>

                            <span>

                                CCCD:
                                {{ request.citizen_id }}

                            </span>

                        </div>

                    </td>

                    <td>

                        <div class="room">

                            <strong>

                                {{ request.title }}

                            </strong>

                        </div>

                    </td>

                    <td>

                        <div class="contact">

                            <span>

                                {{ request.phone }}

                            </span>

                            <span>

                                {{ request.email }}

                            </span>

                        </div>

                    </td>

                    <td>

                        <span
                            class="status"
                            :class="request.status"
                        >

                            <template
                                v-if="request.status === 'pending'"
                            >

                                Chờ duyệt

                            </template>

                            <template
                                v-else-if="request.status === 'approved'"
                            >

                                Đã duyệt

                            </template>

                            <template
                                v-else
                            >

                                Đã từ chối

                            </template>

                        </span>

                    </td>

                    <td>

                        <div class="actions">

                            <button
                                class="icon-btn view"
                                @click="viewRequest(request)"
                            >

                                <Eye :size="18"/>

                            </button>

                            <button
                                v-if="request.status === 'pending'"
                                class="icon-btn approve"
                                @click="approveRequest(request.id)"
                            >

                                <Check :size="18" />

                            </button>

                            <button
                                v-if="request.status === 'pending'"
                                class="icon-btn reject"
                                @click="openRejectModal(request.id)"
                            >
                                <X :size="18" />
                            </button>

                            <template
                                v-if="request.status === 'approved'"
                            >

                                <button
                                    class="icon-btn contract"
                                    @click="openContract(request)"
                                >

                                    <FileText :size="18" />

                                </button>

                                <button
                                    class="icon-btn undo"
                                    @click="unapproveRequest(request.id)"
                                >

                                    <Undo2 :size="18" />

                                </button>

                            </template>

                            <button
                                class="icon-btn delete"
                                @click="deleteRequest(request.id)"
                            >

                                <Trash2 :size="18" />

                            </button>

                        </div>

                    </td>

                </tr>

            </tbody>

        </table>

    </div>


    <div
    v-if="showDetailModal && selectedRequest"
    class="modal-overlay"
    @click.self="showDetailModal = false"
>
    <div class="modal">

        <div class="modal-header">
            <h2>Chi tiết đơn thuê</h2>

            <button
                class="close-btn"
                @click="showDetailModal = false"
            >
                ✕
            </button>
        </div>


        
        <div class="modal-body">

            <div class="info-item">
                <span>Khách thuê</span>
                <strong>{{ selectedRequest.customer_name }}</strong>
            </div>

            <div class="info-item">
                <span>CCCD</span>
                <strong>{{ selectedRequest.citizen_id }}</strong>
            </div>

            <div class="info-item">
                <span>Số điện thoại</span>
                <strong>{{ selectedRequest.phone }}</strong>
            </div>

            <div class="info-item">
                <span>Email</span>
                <strong>{{ selectedRequest.email }}</strong>
            </div>

            <div class="info-item">
                <span>Nghề nghiệp</span>
                <strong>{{ selectedRequest.occupation }}</strong>
            </div>

            <div class="info-item">
                <span>Nơi làm việc</span>
                <strong>{{ selectedRequest.workplace || "Không có" }}</strong>
            </div>

            <div class="info-item">
                <span>Số người dự kiến ở</span>
                <strong>{{ selectedRequest.people_count || "Không có" }}</strong>
            </div>

            <div class="info-item">
                <span>Ngày nhận phòng</span>
                <strong>{{ formatDate(selectedRequest.move_in_date) }}</strong>
            </div>

            <div class="info-item">
                <span>Thời gian dự định thuê</span>
                <strong>{{ selectedRequest.rental_period || "Không có" }}</strong>
            </div>

            <div class="info-item">
                <span>Mục đích thuê</span>
                <strong>{{ selectedRequest.purpose || "Không có" }}</strong>
            </div>


            <div class="info-item">
                <span>Ghi chú</span>
                <strong>{{ selectedRequest.note || "Không có" }}</strong>
            </div>

        </div>

    </div>
</div>

<div
    v-if="showRejectModal"
    class="modal-overlay"
>

    <div class="reject-modal">

        <h2>

            Từ chối đơn thuê

        </h2>

        <textarea
            v-model="rejectReason"
            placeholder="Nhập lý do từ chối..."
        ></textarea>

        <div class="reject-actions">

            <button
                class="cancel-btn"
                @click="showRejectModal = false"
            >

                Hủy

            </button>

            <button
                class="confirm-btn"
                @click="confirmReject"
            >

                Xác nhận

            </button>

        </div>

    </div>

</div>

</template>

<style scoped>

.page{
    display:flex;
    flex-direction:column;
    gap:24px;
}

.top{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.top h1{
    font-size:30px;
    font-weight:700;
    color:#0f172a;
    margin-bottom:6px;
}

.top p{
    color:#64748b;
    font-size:15px;
}

.toolbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:20px;
}

.search-box{
    display:flex;
    align-items:center;
    gap:10px;

    width:380px;

    padding:12px 16px;

    border:1px solid #e2e8f0;

    border-radius:14px;

    background:white;

    box-shadow:0 2px 10px rgba(0,0,0,.05);
}

.search-box input{
    width:100%;
    border:none;
    outline:none;
    font-size:15px;
    background:transparent;
}

.search-icon{
    color:#94a3b8;
}

select{
    padding:12px 16px;

    border-radius:12px;

    border:1px solid #e2e8f0;

    background:white;

    font-size:14px;

    cursor:pointer;
}

table{

    width:100%;

    border-collapse:collapse;

    background:white;

    border-radius:18px;

    overflow:hidden;

    box-shadow:0 5px 18px rgba(0,0,0,.08);

}

thead{

    background:#f8fafc;

}

th{

    padding:18px;

    text-align:left;

    color:#475569;

    font-size:14px;

    font-weight:600;

}

td{

    padding:18px;

    border-top:1px solid #f1f5f9;

}

tbody tr{

    transition:.25s;

}

tbody tr:hover{

    background:#f8fafc;

}

.customer,

.room,

.contact{

    display:flex;

    flex-direction:column;

    gap:5px;

}

.customer span,

.contact span{

    color:#64748b;

    font-size:14px;

}

.status{

    display:inline-flex;

    align-items:center;

    justify-content:center;

    padding:8px 14px;

    border-radius:999px;

    font-size:13px;

    font-weight:600;

}

.pending{

    background:#fef3c7;

    color:#92400e;

}

.approved{

    background:#dcfce7;

    color:#166534;

}

.rejected{

    background:#fee2e2;

    color:#991b1b;

}

.actions{

    display:flex;

    gap:10px;

}

.icon-btn{

    width:38px;

    height:38px;

    border:none;

    border-radius:12px;

    display:flex;

    justify-content:center;

    align-items:center;

    cursor:pointer;

    transition:.2s;

}

.icon-btn:hover{

    transform:translateY(-2px);

}

.view{

    background:#eff6ff;

    color:#2563eb;

}

.approve{

    background:#dcfce7;

    color:#16a34a;

}

.contract{

    background:#eef2ff;

    color:#4338ca;

}

.undo{

    background:#fff7ed;

    color:#ea580c;

}

.delete{

    background:#fef2f2;

    color:#dc2626;

}
.stats{

display:grid;

grid-template-columns:repeat(4,1fr);

gap:20px;

}

.stat-card{

background:white;

border-radius:18px;

padding:24px;

box-shadow:0 5px 18px rgba(0,0,0,.08);

}

.stat-title{

color:#64748b;

font-size:14px;

}

.stat-number{

margin-top:10px;

font-size:34px;

font-weight:700;

color:#0f172a;

}

.pending-text{

color:#000000;

}

.approved-text{

color:#16a34a;

}

.rejected-text{

color:#dc2626;

}

.modal-overlay{
    position:fixed;
    inset:0;
    background:rgba(15,23,42,.45);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:9999;
    backdrop-filter:blur(4px);
}

.modal{
    width:650px;
    background:#fff;
    border-radius:20px;
    padding:28px;
    box-shadow:0 25px 60px rgba(15,23,42,.18);
}

.modal-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:24px;
}

.modal-header h2{
    font-size:24px;
    color:#0f172a;
}

.close-btn{
    width:38px;
    height:38px;
    border:none;
    border-radius:10px;
    background:#f1f5f9;
    cursor:pointer;
    font-size:18px;
}

.close-btn:hover{
    background:#e2e8f0;
}

.modal-body{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:18px;
}

.info-item{
    display:flex;
    flex-direction:column;
    gap:6px;
}

.info-item span{
    font-size:13px;
    color:#64748b;
}

.info-item strong{
    font-size:16px;
    color:#0f172a;
}

.reject-modal{

    width:500px;

    background:#fff;

    border-radius:20px;

    padding:30px;

}

.reject-modal h2{

    margin-bottom:20px;

}

.reject-modal textarea{

    width:100%;

    height:140px;

    border:1px solid #ddd;

    border-radius:12px;

    padding:15px;

    resize:none;

    font-size:15px;

}

.reject-actions{

    display:flex;

    justify-content:flex-end;

    gap:12px;

    margin-top:25px;

}

.cancel-btn{

    padding:12px 22px;

    border:none;

    background:#e5e7eb;

    border-radius:10px;

}

.confirm-btn{

    padding:12px 22px;

    border:none;

    background:#ef4444;

    color:white;

    border-radius:10px;

}

</style>