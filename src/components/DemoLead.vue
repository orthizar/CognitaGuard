<template>
  <section class="relative">
    <div
      class="w-[75vw] right-[-36vw] top-[-30vw] lg:w-[60vw] xl:w-[38rem] xl:right-[-25rem] xl:top-auto xl:bottom-[-10rem] shape"
    ></div>
    <div
      class="w-[75vw] left-[-22vw] bottom-[-25vw] lg:w-[60vw] xl:w-[38rem] xl:left-[-14rem] xl:bottom-auto xl:top-[-14rem] shape"
    ></div>
    <div class="hidden xl:block w-[19rem] top-[-7rem] right-[8rem] shape"></div>

    <div
      class="relative flex items-center min-h-screen mx-4 xl:gap-2 xl:mx-auto xl:grid xl:grid-cols-12 max-w-[100rem]"
    >
      <article class="relative max-w-lg col-span-4 col-start-3 mx-auto">
        <div
          class="hidden xl:block w-[11rem] left-[-4rem] bottom-[-7rem] shape"
        ></div>

        <div
          class="relative px-5 pt-8 pb-6 xl:p-10 bg-gray-dark bg-opacity-90 rounded-2xl"
        >
          <h1 class="flex items-center xl:-mr-2">
            <CGLogo class="w-12 h-12 mr-3 xl:hidden" />
            Cognita Guard
          </h1>
          <strong class="block mt-4 xl:mt-8">Beschreibung</strong>
          <p>
            Cognita Guard erkennt mithilfe künstlicher Intelligenz Gefahren in
            deinem Bild und gibt dir dafür einen nachvollziehbaren Gefahrenscore
            aus. Dabei analysiert die Künstliche Intelligenz vertieft
            verschiedene Bildinhalte, wie zum Beispiel Personen, Emotionen und
            Gegenstände.
          </p>
          <div class="gap-5 mt-8 xl:mt-4 xl:flex">
            <button class="!w-full btn btn--primary" @click="emit('content')">
              Starten
            </button>
            <button
              class="!w-full mt-2 xl:mt-0 btn btn--secondary"
              @click="emit('about')"
            >
              Mehr darüber
            </button>
          </div>
        </div>
      </article>
      <div
        class="items-center justify-center hidden col-span-3 col-start-8 xl:flex"
      >
        <CGLogo class="w-[17rem] h-[17rem]" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CGLogo from "@/assets/icons/cg-logo.svg";

const emit = defineEmits(["content", "about"]);
</script>
