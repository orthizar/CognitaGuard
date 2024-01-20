<template>
  <h2 class="font-normal">Bild hochladen</h2>
  <FileUploadField
    class="flex-grow mt-6 xl:mt-24 xl:max-w-[75%] xl:mx-auto"
    @upload="uploadFile"
  />
  <button
    class="btn btn--primary !w-full xl:!w-48 xl:mx-auto mt-6 xl:mt-16 xl:mb-7"
    :class="{ '!bg-gray-lighter !border-gray-lighter opacity-70 cursor-not-allowed': !file}"
    :disabled="!file"
    @click="submitImage"
  >
    Bild Analysieren
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

import FileUploadField from "@/components/FileUploadField.vue";

const emit = defineEmits(["submit"]);

const file = ref("");

const uploadFile = (uploadedFile: string) => {
  emit("submit", "");
  file.value = uploadedFile;
};

const submitImage = () => {
  emit("submit", file.value);
};
</script>
