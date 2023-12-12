<template>
  <label class="w-full max-w-4xl mx-auto h-full max-h-[70%] cursor-pointer bg-light file-upload-field p-2 rounded-[2.5rem] overflow-hidden">
    <div v-if="image !== ''" class="w-full h-full">
      <img :src="image" class="w-full h-full object-contain" />
    </div>
    <div v-else class="flex flex-col justify-center items-center p-16">
      <DownloadIcon class="fill-primary h-44 w-44" />
      <span class="mt-4 text-2xl text-primary"><strong>Datei auswählen</strong> oder hierher ziehen</span>
    </div>
    <input type="file" class="sr-only" accept="image/*" @change="uploadImage" />
  </label>
</template>

<script setup lang="ts">
import DownloadIcon from '@/assets/icons/download-solid.svg';
import { ref } from 'vue';
const emit = defineEmits(['upload']);
const image = ref('');
const uploadImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image.value = event.target?.result as string;
      emit('upload', event.target?.result);
    };
    reader.readAsDataURL(file);
  }
};
</script>