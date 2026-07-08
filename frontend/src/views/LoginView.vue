<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const account = ref({
    email: "",
    password: ""
});

const login = async () => {
    const response = await fetch("http://localhost:3000/account/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account.value)
    });

    const data = await response.json();

    if (data.status !== 200) {
        alert(data.message);
        return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));

    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));

    alert("Đăng nhập thành công");

    router.push("/");
};
</script>

<template>
<div class="container">
    <input
        v-model="account.email"
        placeholder="Email"
    />

    <input
        v-model="account.password"
        type="password"
        placeholder="Mật khẩu"
    />

    <button @click="login">
        Đăng nhập
    </button>
</div>
</template>