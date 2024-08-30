<script setup>
import { defineProps, ref, reactive } from "vue";
const props = defineProps({
    toggleModal: Function,
    addDevice: Function,
    modalIsOpen: Boolean,
});

const deviceData = reactive({
    name: "",
    MAC: "",
    description: "",
    location: "",
    role: "User",
});

const addDevice = () => {
    props.addDevice(deviceData);
};
</script>
<template>
    <div class="modal block fixed z-1 w-full h-full bg-black/70">
        <div
            class="p-4 rounded-lg h-[93%] flex flex-col bg-white fixed right-0 text-lg justify-between items-center transition-[width] ease-in-out duration-1000"
            :class="props.modalIsOpen ? 'w-1/4' : 'w-0'"
        >
            Add Device
            <img src="../assets/machine.png" alt="machine" class="w-24" />
            <div class="flex w-full">
                <span class="font-semibold text-right pr-2 w-2/6 text-base">Machine Name</span>
                <input type="text" v-model="deviceData.name" class="bg-gray-200 rounded-md w-4/6" />
            </div>
            <div class="flex w-full">
                <span class="font-semibold text-right pr-2 w-2/6">MAC Address</span>
                <input type="text" v-model="deviceData.MAC" class="bg-gray-200 rounded-md w-4/6" />
            </div>
            <div class="flex w-full">
                <span class="font-semibold text-right pr-2 w-2/6">Description</span>
                <textarea rows="4" v-model="deviceData.description" cols="20" class="bg-gray-200 rounded-md w-4/6"></textarea>
            </div>
            <div class="flex w-full">
                <span class="font-semibold text-right pr-2 w-2/6">Location</span>
                <textarea rows="4" v-model="deviceData.location" cols="20" class="bg-gray-200 rounded-md w-4/6"></textarea>
            </div>

            <div class="flex self-end">
                <button class="border-red-500 border-2 rounded-md px-auto w-20 text-red-500" @click="props.toggleModal">Cancel</button>
                <button class="border-green-500 border-2 rounded-md px-auto w-20 ml-2 text-green-500" @click="addDevice()">Add</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.v-leave-from,
.v-enter-to {
    width: 20%;
}
.v-enter-active,
.v-leave-active {
    transition: width 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    width: 0;
}
</style>
