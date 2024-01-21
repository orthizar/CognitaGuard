<template>
  <div class="relative mt-1.5" ref="container">
    <img
      class="object-contain w-full h-full"
      v-if="props.image"
      :src="props.image"
      alt="image"
    />

    <svg
      :viewBox="`0 0 ${props.imageDimensions.width} ${props.imageDimensions.height}`"
      class="absolute top-0 left-0 w-full h-full"
    >
      <polygon
        v-for="face in sortedFaces"
        :key="face.id"
        :points="getPolygonPoints(face.boundingPoly)"
        class="annotation fill-transparent stroke-[6px] hover:stroke-[8px] stroke-red-600"
        @click="toggleTooltip(face)"
        @mouseover="showTooltip(face)"
        @mouseout="hideTooltip"
      />
    </svg>

    <div
      v-if="selectedFace !== null"
      class="absolute z-10 p-2 rounded-md bg-gray-darker"
      :style="{ top: tooltipTop, left: tooltipLeft }"
    >
      <h4>Person {{ selectedFace.id }}</h4>
      <table>
        <tr>
          <td>Freude</td>
          <td>{{ getEmotionFactor(selectedFace.joyLikelihood) }}%</td>
        </tr>
        <tr>
          <td>Kummer</td>
          <td>{{ getEmotionFactor(selectedFace.sorrowLikelihood) }}%</td>
        </tr>
        <tr>
          <td>Wut</td>
          <td>{{ getEmotionFactor(selectedFace.angerLikelihood) }}%</td>
        </tr>
        <tr>
          <td>Überraschung</td>
          <td>{{ getEmotionFactor(selectedFace.surpriseLikelihood) }}%</td>
        </tr>
        <tr>
          <td>Unterbelichtet</td>
          <td>
            {{ getEmotionFactor(selectedFace.underExposedLikelihood) }}%
          </td>
        </tr>
        <tr>
          <td class="pr-2">Verschwommen</td>
          <td>{{ getEmotionFactor(selectedFace.blurredLikelihood) }}%</td>
        </tr>
        <tr>
          <td>Kopfbedeckung</td>
          <td>{{ getEmotionFactor(selectedFace.headwearLikelihood) }}%</td>
        </tr>
      </table>
      <hr class="my-2" />
      <p>{{ Math.round(selectedFace.score * 100) }}% Gefährlich</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from "vue";

import type DemoFace from "@/interfaces/DemoFace";

import { LIKELIHOOD_FACTOR } from "@/helpers/score";
import { getZ, getPolygonPoints } from "@/helpers/annotation";

const props = defineProps<{
  image: string;
  imageDimensions: { width: number; height: number };
  faces: Array<DemoFace>;
}>();

const selectedFace: Ref<DemoFace | null> = ref(null);
const container: Ref<SVGElement | null> = ref(null);

const sortedFaces = computed(() => {
  return props.faces.sort((a: DemoFace, b: DemoFace) => getZ(b) - getZ(a));
});

const tooltipLeft = computed(() => {
  if (!selectedFace.value || !container.value) return "";
  const scale =
    container.value.getBoundingClientRect().width / props.imageDimensions.width;
  const x = selectedFace.value?.boundingPoly[1].x;
  return x * scale + 6 + "px";
});

const tooltipTop = computed(() => {
  if (!selectedFace.value || !container.value) return "";
  const scale =
    container.value.getBoundingClientRect().height /
    props.imageDimensions.height;
  const y = selectedFace.value?.boundingPoly[1].y;
  return y * scale - 3 + "px";
});

const getEmotionFactor = (likelihood: string) => {
  return Math.round(LIKELIHOOD_FACTOR[likelihood] * 100);
};

const showTooltip = (face: DemoFace) => {
  selectedFace.value = face;
};

const hideTooltip = () => {
  selectedFace.value = null;
};

const toggleTooltip = (face: DemoFace) => {
  if (selectedFace.value == face) {
    selectedFace.value = null;
  } else {
    selectedFace.value = face;
  }
};
</script>
