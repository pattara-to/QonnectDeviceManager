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
  const confirmed = await showConfirm("Edit Device?");

  if (confirmed) {
    await deviceStore.editDevice(route.params.id, device);
  }
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
  }
};
</script>

<template>
  <Navbar />
  <!-- Confirmation Modal -->
  <transition name="fade" mode="out-in">
    <ConfirmModal :toggleAlert="toggleAlert" :confirmMessage="confirmMessage" v-show="isModalVisible" @confirm="confirm"
      @cancel="cancel" />
  </transition>

  <div class="flex flex-col h-[93%]">
    <div class="flex justify-between mt-4 mx-16">
      <span class="self-center text-xl ml-4 py-2">
        <RouterLink :to="{ name: 'devices-view' }">Devices</RouterLink> >
        <span class="bg-gray-200 text-violet-700 font-semibold rounded-lg m-1 px-3">{{ device.name }}</span>
      </span>
    </div>

    <!-- Device Info Section test -->
    <div class="w-3/4 h-1/2 transition-all duration-300 mx-auto mt-3">
  <div class="grid grid-cols-[30%,1fr] gap-6 p-6 bg-white rounded-lg">
    <!-- Image Section -->
    <div class="flex justify-center items-center rounded-lgp-4">
      <img src="../assets/machine.png" class="max-w-full h-auto rounded-md " />
    </div>

    <!-- Device Information Section -->
    <div class=" rounded-lg p-6">
      <div class="space-y-6">
        <!-- Input Fields in Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div class="text-2xl">
            <label class="block font-semibold mb-1">Machine Name</label>
            <input
              type="text"
              v-model="device.name"
              class="w-full rounded-md text-xl h-10 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="text-2xl">
            <label class="block font-semibold mb-1">MAC</label>
            <input
              type="text"
              v-model="device.MAC"
              class="w-full rounded-md text-xl h-10 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Description Field -->
        <div class="text-2xl">
          <label class="block font-semibold mb-1">Description</label>
          <input
            type="text"
            v-model="device.description"
            class="w-full rounded-md text-xl h-10 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Location Field -->
        <div class="text-2xl">
          <label class="block font-semibold mb-1">Location</label>
          <input
            type="text"
            v-model="device.location"
            class="w-full rounded-md text-xl h-10 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Status and Buttons Section -->
        <div class="flex items-center gap-4 mt-4">
          <span class="font-semibold text-2xl">Status:</span>
          <div class="w-4 h-4 rounded-full" :class="device.status ? 'bg-green-500' : 'bg-red-500'"></div>
          <span class="text-lg">{{ device.status ? 'Connect' : 'Disconnect' }}</span>

          <button
            class="text-white bg-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            @click="editDevice"
          >
            Edit
          </button>
          <button
            class="text-white bg-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            @click="removeDevice"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



    <!-- Alerts Section -->
    <div
      class="w-4/5 h-1/2 shadow-md my-2 p-8 mx-auto bg-gray-100 rounded-3xl text-lg transition-all duration-300 hover:shadow-lg">
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

      <!-- Alerts Input Form -->
      <div class="flex justify-around items-center mb-2 mr-4">
        <div class="flex justify-between w-2/5">
          <select v-model="alert_statuses[0]" class="w-20 h-8 text-center rounded-xl"
            :class="alert_statuses[0] == 1 ? 'text-green-500' : 'text-red-500'">
            <option value="0" class="text-red-500">OFF</option>
            <option value="1" class="text-green-500">ON</option>
          </select>
          <select v-model="alert_statuses[1]" class="w-20 h-8 text-center rounded-xl"
            :class="alert_statuses[1] == 1 ? 'text-green-500' : 'text-red-500'">
            <option value="0" class="text-red-500">OFF</option>
            <option value="1" class="text-green-500">ON</option>
          </select>
          <select v-model="alert_statuses[2]" class="w-20 h-8 text-center rounded-xl"
            :class="alert_statuses[2] == 1 ? 'text-green-500' : 'text-red-500'">
            <option value="0" class="text-red-500">OFF</option>
            <option value="1" class="text-green-500">ON</option>
          </select>
          <select v-model="alert_statuses[3]" class="w-20 h-8 text-center rounded-xl"
            :class="alert_statuses[3] == 1 ? 'text-green-500' : 'text-red-500'">
            <option value="0" class="text-red-500">OFF</option>
            <option value="1" class="text-green-500">ON</option>
          </select>
        </div>

        <div class="w-32 flex justify-center">
          <input type="color" v-model="color" class="w-16 h-8" />
        </div>

        <input type="text" class="w-1/5 p-1 pl-4 bg-gray-200 rounded-xl" v-model="alert_message"
          placeholder="Alert Message" />
        <button
          class="text-[#008CBA] border p-2 rounded-xl border-[#008CBA] transition-all duration-300 hover:bg-blue-200"
          @click="addAlert">
          Add Alert
        </button>
      </div>

      <!-- Alert List -->
      <div class="overflow-y-scroll h-4/6">
        <div class="flex flex-col my-4" v-for="alert in alerts" :key="alert.id">
          <Alert :alert="alert" :editAlert="editAlert" :removeAlert="removeAlert" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
