<template>
  <h2 class="font-normal">Bild analysieren</h2>
  <div class="relative w-full h-full">
    <div class="w-24 h-24 xl:w-36 xl:h-36 bg-primary loading-square"></div>
    <div
      class="w-16 h-16 xl:w-24 xl:h-24 bg-primary-dark loading-square loading-square-reverse"
    ></div>
  </div>
</template>

<style lang="postcss" scoped>
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(405deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-315deg);
  }
}

.loading-square {
  @apply absolute shadow-md rounded-2xl top-1/2 left-1/2;
  animation: spin 8s linear infinite;
}

.loading-square-reverse {
  animation: spin-reverse 8s linear infinite;
}
</style>
