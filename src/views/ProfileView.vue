<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, reactive } from "vue";
import { useDeviceStore } from "@/stores/device";

const deviceStore = useDeviceStore();

const user = reactive({
    username: "",
    company: "",
    email: "",
    phone: "",
    address: "",
});

onMounted(async () => {
    const result = await deviceStore.user();
    user.username = result.Username;
    user.company = result.Company;
    user.email = result.Email;
    user.phone = result.Phone;
    user.address = result.Address;
    user.lineToken = result.LineToken;
});

const editUser = async () => {
    await deviceStore.editUser(user);
};
</script>

<template>
    <Navbar />
    <div class="flex flex-col h-[93%]">
        <div class="flex justify-between mt-4 mx-16">
            <span class="self-center text-xl ml-4 py-2">
                <RouterLink :to="{ name: 'devices-view' }">Devices</RouterLink> >
                <span class="bg-gray-200 text-violet-700 font-semibold">profile</span>
            </span>
        </div>
        <div class="flex h-full gap-2 w-[95%] mx-auto my-2 text-xl">
            <div class="w-1/6 flex flex-col h-full shadow shadow-black rounded-xl p-4">
                <div>My Account</div>
                <div>General Setting</div>
                <div>Notifications</div>
            </div>
            <div class="w-5/6 h-full shadow shadow-black rounded-xl">
                <div class="m-4">
                    <div>-----------My Account</div>
                    <div class="flex">
                        <img src="../assets/Ptony2.jpg" alt="Ptony" width="200rem" height="200rem" class="rounded-full object-contain" />
                        <div class="flex flex-wrap p-4">
                            <div class="flex w-1/2 gap-2">
                                <div class="w-28 text-end">UserName :</div>
                                <input type="text" class="rounded-md w-5/6 h-8 bg-gray-100" v-model="user.username" />
                            </div>
                            <div class="flex w-1/2 gap-2">
                                <div class="w-28 text-end">Company :</div>
                                <input type="text" class="rounded-md w-5/6 h-8 bg-gray-100" v-model="user.company" />
                            </div>
                            <div class="flex w-1/2 gap-2">
                                <div class="w-28 text-end">Email :</div>
                                <input type="text" class="rounded-md w-5/6 h-8 bg-gray-100" v-model="user.email" />
                            </div>
                            <div class="flex w-1/2 gap-2">
                                <div class="w-28 text-end">Phone :</div>
                                <input type="text" class="rounded-md w-5/6 h-8 bg-gray-100" v-model="user.phone" />
                            </div>
                            <div class="flex w-1/2 gap-2">
                                <div class="w-28 text-end">Password :</div>
                                <input type="text" class="rounded-md w-5/6 h-8 bg-gray-100" />
                            </div>
                            <div class="flex grow w-full gap-2">
                                <div class="w-28 text-end">Address :</div>
                                <input type="text" class="rounded-md w-5/6 h-8 bg-gray-100" v-model="user.address" />
                            </div>
                        </div>
                    </div>
                    <button class="text-[#008CBA] border p-2 rounded-xl border-[#008CBA]" @click="editUser()">Edit</button>
                </div>
                <div class="m-4">
                    -----------Notification
                    <div class="flex w-1/2 items-center">
                        <img src="../assets/LINE_logo.png" alt="Line" height="16rem" width="64px" class="object-contain" />
                        <span>Line Token :</span>
                        <input type="text" class="rounded-md bg-gray-100" v-model="user.lineToken" />
                        <button class="border border-black p-4 w-32 rounded-lg" @click="editUser()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
