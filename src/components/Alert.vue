<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
    alert: {},
    editAlert: Function,
    removeAlert: Function,
});

const statuses = ref([]);

onMounted(() => {
    statuses.value = props.alert.AlertStatus.split("");
});

watch(
    () => props.alert,
    (newAlert) => {
        statuses.value = newAlert.AlertStatus.split("");
    }
);

const editAlert = async () => {
    const alertData = {
        alertStatus: statuses.value.join(""),
        alertMessage: props.alert.AlertMessage,
    };
    props.editAlert(props.alert.AlertID, alertData);
};
</script>

<template>
    <div class="flex justify-around">
        <div class="flex justify-between w-2/5">
            <select
                v-model="statuses[0]"
                id="i0"
                class="w-20 h-8 text-center rounded-xl"
                :class="statuses[0] == 1 ? 'text-green-500' : 'text-red-500'"
            >
                <option value="0" :class="statuses[0] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                <option value="1" :class="statuses[0] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
            </select>
            <select
                v-model="statuses[1]"
                id="i0"
                class="w-20 h-8 text-center rounded-xl"
                :class="statuses[1] == 1 ? 'text-green-500' : 'text-red-500'"
            >
                <option value="0" :class="statuses[1] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                <option value="1" :class="statuses[1] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
            </select>
            <select
                v-model="statuses[2]"
                id="i0"
                class="w-20 h-8 text-center rounded-xl"
                :class="statuses[2] == 1 ? 'text-green-500' : 'text-red-500'"
            >
                <option value="0" :class="statuses[2] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                <option value="1" :class="statuses[2] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
            </select>
            <select
                v-model="statuses[3]"
                id="i0"
                class="w-20 h-8 text-center rounded-xl"
                :class="statuses[3] == 1 ? 'text-green-500' : 'text-red-500'"
            >
                <option value="0" :class="statuses[3] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                <option value="1" :class="statuses[3] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
            </select>
        </div>
        <input type="text" v-model="alert.AlertMessage" class="w-1/5 p-1 pl-4 bg-gray-200 rounded-xl" />

        <div class="text-2xl w-24 flex justify-around">
            <button @click="editAlert()"><i class="bi bi-pencil-square"></i></button>
            <button @click="props.removeAlert(alert.AlertID)"><i class="bi bi-trash w-20"></i></button>
        </div>
    </div>
</template>
