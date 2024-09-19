<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, reactive, ref } from "vue";
import { useDeviceStore } from "@/stores/device";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useConfirm } from "@/stores/useConfirm.js";

const { isModalVisible, confirmMessage, showConfirm, confirm, cancel } = useConfirm();

const deviceStore = useDeviceStore();

const user = reactive({
    username: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    lineToken: "",
});

const profilePic = ref("");

onMounted(async () => {
    try {
        const result = await deviceStore.user();
        user.username = result.Username;
        user.company = result.Company;
        user.email = result.Email;
        user.phone = result.Phone;
        user.address = result.Address;
        user.lineToken = result.LineToken;
    } catch (error) {
        alert("Failed to load user information.");
    }
});

const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        profilePic.value = URL.createObjectURL(file);
        user.profilePic = profilePic.value;
    }
};

//For Edit User
const editUser = async () => {
    try {
        const confirmed = await showConfirm("Edit User information?");

        if (confirmed) {
            const response = await deviceStore.editUser(user);
        }

    } catch (error) {
        alert("Failed to update user information.");
    }
};

// For Edit Line Token
const editLineToken = async () => {
    try {
        const confirmed = await showConfirm("Edit Line Token?");

        if (confirmed) {
            const response = await deviceStore.editLineToken(user.lineToken);
        }
    } catch (error) {
        alert("Failed to update Line Token");
    }
};
</script>

<template>
    <Navbar />
    <transition name="fade" mode="out-in">
        <ConfirmModal :toggleAlert="toggleAlert" :confirmMessage="confirmMessage" v-show="isModalVisible"
            @confirm="confirm" @cancel="cancel" />
    </transition>
    <div class="flex flex-col w-full h-[90%]">
        <!-- Main Content Container -->
        <div class="flex flex-col mx-auto w-[55%] my-auto">
            <!-- My Account Section -->
            <div class="">
                <h2 class="text-3xl font-bold mb-6">My Account</h2>
                <hr class="mb-8" />
                <!-- Profile Picture and Form -->
                <div class="flex items-center mb-8">
                    <!-- Profile Picture Placeholder -->
                    <div class="relative">
                        <div
                            class="w-40 h-40 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center shadow-md">
                            <img src="../assets/Ptony2.jpg" alt="Profile Picture" class="object-cover w-full h-full" />
                        </div>
                        <!-- File Input for Changing Profile Picture -->
                        <input type="file" accept="image/*" @change="handleProfilePicChange"
                            class="absolute bottom-0 left-0 w-40 opacity-0 cursor-pointer h-full" />
                    </div>
                    <!-- User Info Form -->
                    <div class="grid grid-cols-2 gap-6 w-full ml-12">
                        <div>
                            <label class="block font-medium text-xl mb-2">Username</label>
                            <input type="text"
                                class="w-full rounded-md text-xl h-12 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                v-model="user.username" placeholder="Enter your username" aria-label="Username" />
                        </div>
                        <div>
                            <label class="block font-medium text-xl mb-2">Company</label>
                            <input type="text"
                                class="w-full rounded-md text-xl h-12 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                v-model="user.company" placeholder="Enter your company" aria-label="Company" />
                        </div>
                        <div>
                            <label class="block font-medium text-xl mb-2">Email</label>
                            <input type="email"
                                class="w-full rounded-md h-12 text-xl bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                v-model="user.email" placeholder="Enter your email" aria-label="Email" />
                        </div>
                        <div>
                            <label class="block font-medium text-xl mb-2">Phone</label>
                            <input type="tel"
                                class="w-full rounded-md h-12 text-xl bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                v-model="user.phone" placeholder="Enter your phone number" aria-label="Phone" />
                        </div>
                        <div class="col-span-2">
                            <label class="block font-medium text-xl mb-2">Address</label>
                            <input type="text"
                                class="w-full rounded-md h-12 text-xl bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                v-model="user.address" placeholder="Enter your address" aria-label="Address" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition shadow-md text-lg"
                        @click="editUser" aria-label="Edit User Information">
                        Edit
                    </button>
                </div>
            </div>

            <div class="mb-8">
                <h2 class="text-3xl font-bold mb-6">Notification</h2>
                <hr class="mb-8" />
                <div class="flex items-center gap-6 mb-6">
                    <img src="../assets/LINE_logo.png" alt="Line" class="w-20 h-20 object-contain" />
                    <div class="flex-grow">
                        <label class="block font-medium text-xl mb-2">Line Token</label>
                        <input type="text"
                            class="w-full rounded-md text-xl h-12 bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            v-model="user.lineToken" placeholder="Enter your Line token" aria-label="Line Token" />
                    </div>
                </div>
                <!-- Button Aligned to the Right -->
                <div class="flex justify-end">
                    <button
                        class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition shadow-md text-lg"
                        @click="editLineToken" aria-label="Save Line Token">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>