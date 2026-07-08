import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomDetailView from '../views/RoomDetailView.vue'
import AppointmentView from "../views/AppointmentView.vue"
import RegisterRoomView from "../views/RegisterRoomView.vue";
import LoginView from "@/views/LoginView.vue";
import AppointmentHistoryView from "../views/AppointmentHistoryView.vue";
import AdminDashboardView from "@/views/admin/AdminDashboardView.vue";
import AdminLayout from "@/layout/AdminLayout.vue";

import AdminRoomView from "@/views/admin/AdminRoomView.vue";
import AdminAppointmentView from "@/views/admin/AdminAppointmentView.vue";
import AdminBookingView from "@/views/admin/AdminBookingView.vue";
import AdminUserView from "@/views/admin/AdminUserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    component: HomeView
  },

  {
    path: '/room/:id',
    name: "room-detail",
    component: RoomDetailView
  },

  {
    path: "/appointment/:id",
    name: "appointment",
    component: AppointmentView
  },

  {
    path: "/register-room",
    component: RegisterRoomView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/appointments",
    name: "appointments",
    component: AppointmentHistoryView
  },

  {
    path: "/admin",
    component: AdminLayout,

    children: [
        {
            path: "",
            component: AdminDashboardView,
        },

        {
            path: "rooms",
            component: AdminRoomView,
        },

        {
            path: "appointments",
            component: AdminAppointmentView,
        },

        {
            path: "bookings",
            component: AdminBookingView,
        },

        {
            path: "users",
            component: AdminUserView,
        },
    ]
}

  ]
  })

export default router
