<template>
  <div class="mt-4 xl:mt-6 xl:max-w-[75%] xl:mx-auto">
    <h3 class="xl:text-lg">Objekte: {{ objectScore }}% Gefährlich</h3>
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
          v-for="(object, i) in sortedObjects"
          :key="i"
          :points="getPolygonPoints(object.boundingPoly)"
          class="annotation fill-transparent stroke-[6px] hover:stroke-[8px] stroke-red-600"
          @click="toggleTooltip(object)"
          @mouseover="showTooltip(object)"
          @mouseout="hideTooltip"
        />
      </svg>

      <div
        v-if="selectedObject !== null"
        class="absolute z-10 p-2 rounded-md bg-gray-darker"
        :style="{ top: tooltipTop, left: tooltipLeft }"
      >
        <h4>
          {{ selectedObject.name }}
          <span v-if="selectedObject.face" class="text-gray-lighter"
            >(Person {{ selectedObject.face }})</span
          >
        </h4>
        <p>{{ Math.round(selectedObject.score * 100) }}% Gefährlich</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from "vue";

import type DemoObject from "@/interfaces/DemoObject";

import { getZ, getPolygonPoints } from "@/helpers/annotation";

const props = defineProps<{
  image: string;
  imageDimensions: { width: number; height: number };
  objects: Array<DemoObject>;
}>();

const selectedObject: Ref<DemoObject | null> = ref(null);
const container: Ref<SVGElement | null> = ref(null);

const sortedObjects = computed(() => {
  return props.objects.sort(
    (a: DemoObject, b: DemoObject) => getZ(b) - getZ(a)
  );
});

const tooltipLeft = computed(() => {
  if (!selectedObject.value || !container.value) return "";
  const scale =
    container.value.getBoundingClientRect().width / props.imageDimensions.width;
  const x = selectedObject.value?.boundingPoly[1].x;
  return x * scale + 6 + "px";
});

const tooltipTop = computed(() => {
  if (!selectedObject.value || !container.value) return "";
  const scale =
    container.value.getBoundingClientRect().height /
    props.imageDimensions.height;
  const y = selectedObject.value?.boundingPoly[1].y;
  return y * scale - 3 + "px";
});

const objectScore = computed(() => {
  return Math.round(
    props.objects.reduce((a, b) => Math.max(a, b.score), 0.5) * 100
  );
});

const showTooltip = (object: DemoObject) => {
  selectedObject.value = object;
};

const hideTooltip = () => {
  selectedObject.value = null;
};

const toggleTooltip = (object: DemoObject) => {
  if (selectedObject.value == object) {
    console.log("hide");
    selectedObject.value = null;
  } else {
    selectedObject.value = object;
  }
};
</script>
