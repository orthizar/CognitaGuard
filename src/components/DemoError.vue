<template>
  <div>
    <h2 class="font-normal">Error</h2>
    <p class="mt-4">
      Bei der Berechnung des Gefahrenscore ist ein unerwarteter Fehler
      aufgetreten. Bitte versuchen Sie es erneut.
    </p>
  </div>
  <button
    class="!w-full xl:!w-48 mx-auto justify-self-end mt-8 btn btn--primary"
    @click="emit('reset')"
  >
    Erneut versuchen
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["reset"]);
</script>
