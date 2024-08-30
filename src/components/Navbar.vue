<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="nav flex flex-row text-white justify-between items-center px-16">
        <img src="../assets/QonnectLogoWhite.svg" alt="Qonnect Logo" class="h-3/4 text-white" />
        <div class="w-32 flex flex-row justify-around items-center align-middle">
            <RouterLink :to="{ name: 'devices-view' }"><i class="bi bi-house-fill"></i></RouterLink>
            <RouterLink :to="{ name: 'profile-view' }"><i class="bi bi-person"></i></RouterLink>
            <RouterLink :to="{ name: 'login-view' }"><i class="bi bi-box-arrow-right"></i></RouterLink>
        </div>
    </div>
</template>

<style scoped>
.nav {
    background-color: #251c4a;
    height: 7%;
}
h1 {
    font-size: xx-large;
    font-weight: bold;
}
i {
    font-size: 24px;
    font-weight: bold;
}
</style>
