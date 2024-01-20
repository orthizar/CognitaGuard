<template>
  <section>
    <div
      class="flex min-h-screen py-12 mx-4 xl:py-32 xl:gap-2 xl:mx-auto xl:grid xl:grid-cols-12 max-w-[100rem]"
    >
      <article
        class="relative w-full max-w-lg col-span-8 col-start-3 mx-auto xl:max-w-none"
      >
        <div
          class="hidden xl:block w-[11rem] left-[-2rem] bottom-[0rem] shape"
        ></div>

        <div
          class="relative flex flex-col justify-between h-full px-5 pt-6 xl:p-10 xl:pb-12 pb-9 bg-gray-dark bg-opacity-90 rounded-2xl"
        >
          <div>
            <h2 class="font-normal">Über das Projekt</h2>
            <p class="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <button
            class="!w-full xl:!w-48 mx-auto justify-self-end mt-8 btn btn--primary"
            @click="emit('content')"
          >
            Jetzt versuchen
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(["content"]);
</script>
