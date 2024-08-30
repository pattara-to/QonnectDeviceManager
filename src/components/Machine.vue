<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

const status = ref(0);

const props = defineProps({
    device: {},
});

onMounted(() => {
    if (props.device.IOStatus !== undefined) {
        status.value = props.device.IOStatus;
    }
});

watch(
    () => props.device,
    (newDevice) => {
        if (newDevice.IOStatus !== undefined) {
            status.value = newDevice.IOStatus;
        }
    }
);
</script>
<template>
    <RouterLink :to="{ name: 'edit-view', params: { id: device.DeviceID } }">
        <div class="flex flex-col w-full items-center text-center shadow-md justify-around rounded justify-self-center hover:scale-105">
            <div class="w-30 flex flex-col items-center m-2">
                <div class="w-4 h-4 rounded-full" :class="device.Status ? 'bg-green-500' : 'bg-red-500'"></div>
                <div v-if="device.Status">Connect</div>
                <div v-else>Disconnect</div>
            </div>
            <div class="h-24">
                <img src="../assets/machine.png" alt="machine" class="w-24" />
            </div>
            <h1>{{ device.Name }}</h1>
            <p class="truncate w-full">{{ device.Location }}</p>
            <p>{{ device.MAC }}</p>
            <div class="flex flex-row w-24 h-16 justify-between">
                <div v-for="(s, index) in status" :key="index" class="font-bold">
                    <div class="w-4 h-4 rounded-full" :style="s == '1' ? { 'background-color': 'green' } : { 'background-color': 'red' }"></div>
                    I{{ index + 1 }}
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
h1 {
    font-size: 16px;
}
</style>
