<template>
  <div class="w-screen h-screen bg-gradient-to-b from-dark-darker to-dark">
    <div class="container pt-[10.25rem] 2xl:pt-[12.5rem] pb-16 h-screen">
      <div class="bg-opacity-90 bg-dark rounded-[2.5rem] w-full h-full shadow-md p-16">
        <div class="flex -mx-8 h-full">
          <div class="w-2/3 px-8 flex flex-col justify-between h-full">
            <FileUploadField />

            <div class="flex mt-16">
              <button class="btn">Bild analysieren</button>
            </div>
          </div>

          <div class="w-1/3 px-8 flex flex-col justify-center h-full">
            <h1 class="border-b-4 border-white text-center mb-6 pb-4 leading-none">Demo</h1>
            <p class="text-lg 2xl:text-2xl leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUploadField from '@/components/FileUploadField.vue';
</script>