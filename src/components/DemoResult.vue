<template>
  <h2 class="font-normal">Risikobewertung</h2>

  <h3 class="mt-3 text-xl xl:text-2xl xl:mt-16 xl:text-center">
    Gefahr: {{ Math.round(finalScore.total * 100) }}%
  </h3>
  <p class="text-lg text-gray-lighter xl:text-center xl:text-xl">
    {{ finalScore.faceScore.toFixed(2) }}
    &times;
    {{ finalScore.objectScore.toFixed(2) }}
    =
    {{ finalScore.total.toFixed(2) }}
  </p>

  <div class="mt-7 xl:mt-12 xl:max-w-[75%] xl:mx-auto">
    <h3 class="xl:text-lg">Emotionen: {{ Math.round(finalScore.faceScore * 100) }}% Gefährlich</h3>
    <FacesImage :image="props.image" :image-dimensions="props.imageDimensions" :faces="props.faces" />

    <h3 class="mt-4 xl:mt-6 xl:text-lg">Objekte: {{ Math.round(finalScore.objectScore * 100) }}% Gefährlich</h3>

    <ObjectsImage :image="props.image" :image-dimensions="props.imageDimensions" :objects="props.objects" />
  </div>
  
  <div class="mt-9 xl:flex xl:justify-center xl:mt-12 xl:gap-5">
    <button class="!w-full xl:!w-48 btn btn--primary" @click="emit('reset')">
      Erneute Analyse
    </button>
    <button class="!w-full xl:!w-48 mt-2 xl:mt-0 btn btn--secondary" @click="emit('about')">
      Mehr darüber
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import FacesImage from '@/components/FacesImage.vue';
import ObjectsImage from '@/components/ObjectsImage.vue';

import DemoFace from '@/interfaces/DemoFace';
import DemoObject from '@/interfaces/DemoObject';
import Dimensions from '@/interfaces/Dimensions';

const emit = defineEmits(['reset', 'about']);

const props = defineProps<{
  faces: DemoFace[],
  objects: DemoObject[],
  image: string,
  imageDimensions: Dimensions,
}>();

const finalScore = computed(() => {
  const scores = props.faces.map((face) => {
    const faceObjects = props.objects.filter((o) => o.face == face.id);
    const objectScore = faceObjects.reduce((a, b) => Math.max(a, b.score), 0.5);
    return {
      faceScore: face.score,
      objectScore,
      total: face.score * objectScore,
    };
  });

  const remainingObjects = props.objects.filter((o) => !o.face);
  const remainingObjectsScore = remainingObjects.reduce(
    (a, b) => Math.max(a, b.score),
    0
  );

  if (Math.max(...scores.map((s) => s.total)) < remainingObjectsScore * 0.5) {
    return {
      faceScore: 0.5,
      objectScore: remainingObjectsScore,
      total: remainingObjectsScore * 0.5,
    };
  }
  return scores.sort((a, b) => b.total - a.total)[0];
});
</script>