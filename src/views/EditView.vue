<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useDeviceStore } from "@/stores/device";
import Alert from "@/components/Alert.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useConfirm } from "@/stores/useConfirm.js";

const { isModalVisible, confirmMessage, showConfirm, confirm, cancel } = useConfirm();

const route = useRoute();
const router = useRouter();

const deviceStore = useDeviceStore();

const device = reactive({
    name: "",
    MAC: "",
    description: "",
    location: "",
});

const alerts = ref([]);
const a = ref(0);

const alert_statuses = ref([0, 0, 0, 0]);
const alert_message = ref("");

onMounted(async () => {
    await deviceStore.loadDevice(route.params.id);
    await deviceStore.loadAlerts(route.params.id);
    setDevice(deviceStore.selectedDevice);
    alerts.value = deviceStore.alertList;
});

const setDevice = (selectedDevice) => {
    device.name = selectedDevice.Name;
    device.MAC = selectedDevice.MAC;
    device.description = selectedDevice.Description;
    device.location = selectedDevice.Location;
    device.status = selectedDevice.Status;
    device.IOStatus = selectedDevice.IOStatus;
};

const toggleAlert = () => {
    alertIsOpen.value = !alertIsOpen.value;
};

const addAlert = async () => {
    if (alert_message.value != "") {
        const alertData = {
            alertStatus: alert_statuses.value.join(""),
            alertMessage: alert_message.value,
            deviceID: route.params.id,
            MAC: device.MAC,
        };
        await deviceStore.addAlert(alertData);
        await deviceStore.loadAlerts(route.params.id);
        alert_message.value = "";
        alerts.value = deviceStore.alertList;
    }
};

const editDevice = async () => {
    await deviceStore.editDevice(route.params.id, device);
};

const editAlert = async (alertID, alertData) => {
    await deviceStore.editAlert(alertID, alertData);
};

const removeDevice = async () => {
    const confirmed = await showConfirm("Remove Device?");

    if (confirmed) {
        await deviceStore.removeDevice(route.params.id);
        router.push("/");
    }
};

const removeAlert = async (alertID) => {
    const confirmed = await showConfirm("Remove Alert?");

    if (confirmed) {
        await deviceStore.removeAlert(alertID);
        await deviceStore.loadAlerts(route.params.id);
        alerts.value = deviceStore.alertList;
        console.log(alerts.value);
    }
};
</script>
<template>
    <Navbar />
    <ConfirmModal :toggleAlert="toggleAlert" :confirmMessage="confirmMessage" v-show="isModalVisible" @confirm="confirm" @cancel="cancel" />
    <div class="flex flex-col h-[93%]">
        <div class="flex justify-between mt-4 mx-16">
            <span class="self-center text-xl ml-4 py-2">
                <RouterLink :to="{ name: 'devices-view' }">Devices</RouterLink> >
                <span class="bg-gray-200 text-violet-700 font-semibold">{{ device.name }}</span>
            </span>
        </div>
        <div class="w-4/5 h-1/2 shadow-md my-2 mx-auto bg-gray-100 rounded-3xl">
            <div class="flex">
                <div class="w-1/5 m-4 p-4 bg-white rounded-xl flex items-center">
                    <img src="../assets/machine.png" alt="machine" class="w-full" />
                </div>
                <div class="m-4">
                    <div>
                        <span class="p-2 text-2xl">
                            <span class="font-bold my-4">Machine Name:</span>
                            <input type="text" class="w-2/6 m-2 p-1 pl-4 bg-gray-200 rounded-xl" v-model="device.name" />
                        </span>
                        <span class="p-2 text-2xl">
                            <span class="font-bold">MAC:</span>
                            <input type="text" class="w-2/6 p-1 pl-4 m-2 bg-gray-200 rounded-xl" v-model="device.MAC" />
                        </span>
                    </div>
                    <div class="p-2 text-2xl">
                        <span class="font-bold">Description:</span>
                        <input type="text" class="w-[80%] p-1 pl-4 m-2 bg-gray-200 rounded-xl" v-model="device.description" />
                    </div>
                    <div class="p-2 text-2xl">
                        <span class="font-bold">Location:</span>
                        <input type="text" class="w-[85%] p-1 pl-4 m-2 bg-gray-200 rounded-xl" v-model="device.location" />
                    </div>
                    <div class="flex p-2 text-2xl w-1/2 gap-4 items-center">
                        <span class="font-bold">Status:</span>
                        <div class="w-4 h-4 rounded-full" :class="device.status ? 'bg-green-500' : 'bg-red-500'"></div>
                        <span v-if="device.status">Connect</span>
                        <span v-else>Disconnect</span>
                        <button class="text-[#008CBA] border p-2 rounded-xl border-[#008CBA]" @click="editDevice()">Edit</button>
                        <button class="text-[#008CBA] border p-2 rounded-xl border-[#008CBA]" @click="removeDevice()">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-4/5 h-1/2 shadow-md my-2 p-8 mx-auto bg-gray-100 rounded-3xl text-lg">
            <div class="flex justify-around items-center mb-6 font-bold text-2xl text-center mr-4">
                <div class="flex justify-between w-2/5">
                    <div class="w-20">I1</div>
                    <div class="w-20">I2</div>
                    <div class="w-20">I3</div>
                    <div class="w-20">I4</div>
                </div>
                <div class="w-32">AlertColor</div>
                <div class="w-1/5">AlertName</div>
                <div class="w-24"></div>
            </div>
            <div class="flex justify-around items-center mb-2 mr-4">
                <div class="flex justify-between w-2/5">
                    <select
                        v-model="alert_statuses[0]"
                        id="i0"
                        class="w-20 h-8 text-center rounded-xl"
                        :class="alert_statuses[0] == 1 ? 'text-green-500' : 'text-red-500'"
                    >
                        <option value="0" :class="alert_statuses[0] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                        <option value="1" :class="alert_statuses[0] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
                    </select>
                    <select
                        v-model="alert_statuses[1]"
                        id="i0"
                        class="w-20 h-8 text-center rounded-xl"
                        :class="alert_statuses[1] == 1 ? 'text-green-500' : 'text-red-500'"
                    >
                        <option value="0" :class="alert_statuses[1] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                        <option value="1" :class="alert_statuses[1] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
                    </select>
                    <select
                        v-model="alert_statuses[2]"
                        id="i0"
                        class="w-20 h-8 text-center rounded-xl"
                        :class="alert_statuses[2] == 1 ? 'text-green-500' : 'text-red-500'"
                    >
                        <option value="0" :class="alert_statuses[2] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                        <option value="1" :class="alert_statuses[2] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
                    </select>
                    <select
                        v-model="alert_statuses[3]"
                        id="i0"
                        class="w-20 h-8 text-center rounded-xl"
                        :class="alert_statuses[3] == 1 ? 'text-green-500' : 'text-red-500'"
                    >
                        <option value="0" :class="alert_statuses[3] == 0 ? 'hidden' : 'block'" class="text-red-500">OFF</option>
                        <option value="1" :class="alert_statuses[3] == 1 ? 'hidden' : 'block'" class="text-green-500">ON</option>
                    </select>
                </div>
                <div class="w-32 flex justify-center">
                    <input type="color" v-model="color" class="w-16 h-8" />
                </div>
                <input type="text" class="w-1/5 p-1 pl-4 bg-gray-200 rounded-xl" v-model="alert_message" placeholder="Alert Message" />
                <button class="text-[#008CBA] border p-2 rounded-xl border-[#008CBA] w-24" @click="addAlert()">Add Alert</button>
            </div>
            <div class="border-2 my-2"></div>
            <div class="overflow-y-scroll h-4/6">
                <div class="flex flex-col my-4" v-for="alert in alerts">
                    <Alert :alert="alert" :editAlert="editAlert" :removeAlert="removeAlert" />
                </div>
            </div>
        </div>
        <!-- <div class="w-4/5 h-3/5 shadow-lg shadow-gray-400 my-2 mx-auto bg-gray-100 rounded-3xl">
            <table class="w-[95%] text-2xl m-4 text-center">
                <thead>
                    <th class="w-2/6">Alert Name</th>
                    <th class="w-1/6">Alert Color</th>
                    <th>I1</th>
                    <th>I2</th>
                    <th>I3</th>
                    <th>I4</th>
                </thead>
                <tbody>
                    <tr>
                        <td class="shadow-lg bg-state-100 align-middle">Tony Tony Shopper</td>
                        <td><input type="color" class="w-1/2 h-10 box-border align-middle" value="#00F0FF" /></td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="shadow-lg bg-state-100">Tony Stark</td>
                        <td><input type="color" class="w-1/2 h-10 box-border align-middle" value="#FF0000" /></td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="shadow-lg bg-state-100">(An)Tony Starr</td>
                        <td><input type="color" class="w-1/2 h-10 box-border align-middle" value="#FFE500" /></td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="shadow-lg bg-state-100">(An)T(h)ony Hopkins</td>
                        <td><input type="color" class="w-1/2 h-10 box-border align-middle" value="#FF9100" /></td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="">
                                <option value="off">OFF</option>
                                <option value="on">ON</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="relative left-[10%] p-2 border border-[#008CBA] text-[#008CBA] rounded-xl">+ เพื่มการแจ้งเตือน</button>
        </div> -->
    </div>
</template>

<style scoped>
table,
th,
tr {
    border: 16px solid #f3f4f6;
}
table {
    border-spacing: 5px;
}
</style>
