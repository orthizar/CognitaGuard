<template>
  <label class="w-full max-w-4xl mx-auto h-full max-h-[70%] cursor-pointer justify-center bg-light file-upload-field p-16 rounded-[2.5rem] flex flex-col items-center overflow-hidden">
    <DownloadIcon class="fill-primary h-44 w-44" />
    <span class="mt-4 text-2xl text-primary"><strong>Datei auswählen</strong> oder hierher ziehen</span>
    <input type="file" class="sr-only" />
  </label>
</template>

<script setup lang="ts">
import DownloadIcon from '@/assets/icons/download-solid.svg';
</script>