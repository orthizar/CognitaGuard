<template>
  <label class="w-full bg-light file-upload-field p-16 rounded-[2.5rem] flex flex-col items-center overflow-hidden">
    <DownloadIcon class="fill-primary h-44 w-44" />
    <span class="text-primary text-2xl mt-4"><strong>Datei auswählen</strong> oder hierher ziehen</span>
    <input type="file" class="sr-only" />
  </label>
</template>

<script setup lang="ts">
import DownloadIcon from '@/assets/icons/download-solid.svg';
</script>