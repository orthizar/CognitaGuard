<template>
  <header class="w-full bg-dark py-3.5 fixed top-0 left-0 shadow-md z-10">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="flex items-center ml-16 hover:opacity-80">
        <CGLogo class="h-11 w-11" />
        <span class="ml-2 text-4xl font-bold leading-none">CognitaGuard</span>
      </RouterLink>

      <RouterLink v-if="!isAbout" to="/about" class="btn">Wie funktioniert es?</RouterLink> 
    </div>
  </header>
</template>

<script setup lang="ts">
import CGLogo from '@/assets/icons/cg-logo.svg';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isAbout = computed(() => route.path === '/about');
</script>