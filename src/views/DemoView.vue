<template>
  <DemoUpload />
  <DemoLoading v-if="isLoading" />
  <DemoResult v-else-if="results" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DemoUpload from '@/components/DemoUpload.vue';
import DemoLoading from '@/components/DemoLoading.vue';
import DemoResult from '@/components/DemoResult.vue';

const isLoading = ref(false);
const results = ref([]);
</script>