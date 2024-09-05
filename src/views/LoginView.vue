<script setup>
import { useDeviceStore } from "@/stores/device";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userData = reactive({
    email: "",
    password: "",
});

const deviceStore = useDeviceStore();

const login = async () => {
    if (userData.email != "" && userData.password != "") {
        const res = await deviceStore.login(userData);
        if (res.isOk) {
            router.push({ name: "devices-view" });
        }
    }
};
</script>
<template>
    <div class="bg-[#251C4A] h-full">
        <div class="bg-white w-1/3 h-2/5 m-auto fixed inset-0 rounded-xl">
            <div class="text-[#D8D5D5] rounded-xl flex flex-col justify-center items-center h-full">
                <div class="h-1/5"><img src="../assets/QonnectLogo.svg" alt="Qonnect Logo" class="h-full" /></div>
                <div class="w-1/2 my-4">
                    Email
                    <input type="text" class="bg-[#D8D5D5] rounded-lg w-full h-8 text-black p-2" v-model="userData.email" />
                    <div>Password</div>
                    <input type="password" class="bg-[#D8D5D5] rounded-lg w-full h-8 text-black p-2" v-model="userData.password" />
                </div>
                <button class="bg-[#4424FF] rounded-lg w-1/2 h-8" @click="login()">Login</button>
            </div>
        </div>
    </div>
</template>
