<script setup>
const props = defineProps({
    toggleAlert: Function,
    confirmMessage: String,
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => {
    emit("confirm");
};

const cancel = () => {
    emit("cancel");
};
</script>
<template>
    <div class="block fixed z-1 w-full h-full bg-black/70">
        <div class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[600px] h-72 bg-white flex flex-col items-center text-xl">
            <div class="h-1/5 self-end">
                <button class="border border-black p-4 w-32 rounded-lg" @click="cancel">X</button>
            </div>
            <div class="h-2/5 flex items-center">{{ props.confirmMessage }}</div>
            <div class="h-2/5 flex items-center"><button class="border border-black p-4 w-32 rounded-lg" @click="confirm">Confirm</button></div>
        </div>
    </div>
</template>
