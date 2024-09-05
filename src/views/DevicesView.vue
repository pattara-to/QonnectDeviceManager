<script setup>
import { onMounted, ref } from "vue";
import Machine from "@/components/Machine.vue";
import { useDeviceStore } from "@/stores/device";
import AddModal from "@/components/AddModal.vue";
import Navbar from "@/components/Navbar.vue";

const deviceStore = useDeviceStore();

const modalIsOpen = ref(false);

onMounted(async () => {
    await deviceStore.loadDevices();
});

setInterval(async () => {
    await deviceStore.loadDevices();
}, 1000);

const toggleModal = () => {
    modalIsOpen.value = !modalIsOpen.value;
};

const addDevice = async (deviceData) => {
    deviceStore.addDevice(deviceData);
    modalIsOpen.value = false;
    await deviceStore.loadDevices();
};
</script>

<template>
    <Navbar />
    <AddModal :toggleModal="toggleModal" :addDevice="addDevice" :modalIsOpen="modalIsOpen" v-show="modalIsOpen" />
    <div class="flex flex-col h-[93%]">
        <div class="flex justify-between my-4 mx-16">
            <span class="self-center text-xl ml-4">Devices</span>
            <button
                @click="toggleModal"
                class="rounded w-fit px-4 py-2 text-l border text-[#008cba] border-[#008cba] hover:bg-[#008cba] hover:text-white"
            >
                + Add Device
            </button>
        </div>

        <div class="grid grid-cols-6 grid-rows-2 justify-center mx-16 my-4 w-11/12 h-full gap-x-14 gap-y-4">
            <Machine :device="device" v-for="device in deviceStore.list" />
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 16px;
}
</style>
