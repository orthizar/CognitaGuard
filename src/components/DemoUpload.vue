<template>
  <div class="relative w-screen h-screen bg-gradient-to-b from-dark-darker to-dark">
    <div class="absolute -top-[26.5rem] rotate-45 -left-[26.5rem] w-[50vw] h-[50vw] bg-primary rounded-[1.5rem] 2xl:rounded-[2.5rem]"></div>
    <div class="absolute rotate-45 right-44 -bottom-44 w-[50vw] h-[50vw] bg-primary rounded-[1.5rem] 2xl:rounded-[2.5rem]"></div>
    <div class="container pt-[8.5rem] pb-16 h-screen relative">
      <div class="bg-opacity-90 bg-dark rounded-[2.5rem] w-full h-full shadow-md p-16">
        <div class="flex h-full -mx-8">
          <div class="flex flex-col justify-between w-2/3 h-full px-8">
            <FileUploadField />

            <div class="flex items-center mt-16">
              <div class="w-full bg-primary h-0.5 mr-5"></div>
              <button class="btn shrink-0">Bild analysieren</button>
              <div class="w-full bg-primary h-0.5 ml-5"></div>
            </div>
          </div>

          <div class="flex flex-col justify-center w-1/3 h-full px-8">
            <h1 class="pb-4 mb-6 leading-none text-center border-b-4 border-white">Demo</h1>
            <p class="text-lg leading-tight 2xl:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
      <div class="absolute rotate-45 right-12 bottom-12 w-[10vw] h-[10vw] bg-primary rounded-[1.5rem] 2xl:rounded-[2.5rem]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUploadField from '@/components/FileUploadField.vue';
</script>