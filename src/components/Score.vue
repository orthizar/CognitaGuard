<template>
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
</template>

<script setup lang="ts">
import { computed } from "vue";
import type DemoFace from "@/interfaces/DemoFace";
import type DemoObject from "@/interfaces/DemoObject";

const props = defineProps<{
  faces: Array<DemoFace>;
  objects: Array<DemoObject>;
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

  console.log(scores, remainingObjectsScore)

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
