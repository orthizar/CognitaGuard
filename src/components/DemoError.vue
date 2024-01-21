<template>
  <div>
    <h2 class="font-normal">Error</h2>
    <p class="mt-4">
      Beim Ausführen der Analyse ist ein Fehler aufgetreten, welcher die vollständige Bewertung des Bildes beeinträchtigt hat. Bitte versuchen Sie nochmals.
    </p>
  </div>
  <button
    class="!w-full xl:!w-48 mx-auto justify-self-end mt-8 btn btn--primary"
    @click="emit('reset')"
  >
    Neues Bild versuchen
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["reset"]);
</script>
