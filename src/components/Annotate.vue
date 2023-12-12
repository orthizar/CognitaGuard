<template>
  <div class="card">
    <div class="image-container">
      <img class="image" v-if="props.image" :src="props.image" alt="image" />
      <svg
        :viewBox="`0 0 ${props.imageDimensions.width} ${props.imageDimensions.height}`"
        class="annotations-container"
      >
        <polygon
          v-for="(polygon, index) in props.objectAnnotations"
          :key="index"
          :points="getPolygonPoints(polygon)"
          :data-title="`Object ${index + 1}`"
          :data-text="`Object text ${index + 1}`"
          class="object-annotation"
        />
        <polygon
          v-for="(polygon, index) in props.faceAnnotations"
          :key="index"
          :points="getPolygonPoints(polygon)"
          :data-title="`Face ${index + 1}`"
          :data-text="`Face text ${index + 1}`"
          class="face-annotation"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  imageDimensions: { width: number; height: number };
  faceAnnotations: Array<any> | undefined;
  objectAnnotations: Array<any> | undefined;
}>();

const getPolygonPoints = (polygon: Array<any>): string => {
  return polygon
    .map((vertex: any) => {
      return `${vertex.x},${vertex.y}`;
    })
    .join(" ");
};
</script>
<style scoped>
.image-container {
  position: relative;
  width: 50%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.annotations-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.annotations-container polygon:hover {
  stroke-width: 6;
}
.face-annotation {
  fill: #00000000;
  stroke: #ff0000;
  stroke-width: 3;
}

.object-annotation {
  fill: #00000000;
  stroke: #00ff00;
  stroke-width: 3;
}
</style>
