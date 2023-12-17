<template>
  <div class="card">
    <div class="image-container">
      <div class="tooltip">
        <div class="tooltip-title"></div>
        <div class="tooltip-text"></div>
      </div>
      <img class="image" v-if="props.image" :src="props.image" alt="image" />
      <svg
        :viewBox="`0 0 ${props.imageDimensions.width} ${props.imageDimensions.height}`"
        class="annotations-container"
      >
        <polygon
          v-for="(annotation, index) in props.annotations"
          :key="index"
          :points="getPolygonPoints(annotation.boundingPoly)"
          :data-title="annotation.title"
          :data-text="annotation.text"
          class="annotation"
          :style="{ stroke: annotation.color }"
          v-on:mouseover="($event: any) => {
            // tooltip
            const tooltip = $event.target.parentElement.parentElement.querySelector('.tooltip');
            const tooltipTitle = tooltip.querySelector('.tooltip-title');
            const tooltipText = tooltip.querySelector('.tooltip-text');
            tooltipTitle.innerHTML = $event.target.dataset.title;
            tooltipText.innerHTML = $event.target.dataset.text;
            tooltip.style.display = 'block';

            // place tooltip near polygon
            const xScale = $event.target.parentElement.getBoundingClientRect()
              .width / $event.target.parentElement.viewBox.baseVal.width;
            const yScale = $event.target.parentElement.getBoundingClientRect()
              .height / $event.target.parentElement.viewBox.baseVal.height;

            tooltip.style.top = $event.target.points[1].y * yScale + 'px';
            tooltip.style.left = $event.target.points[1].x * xScale + 6 + 'px';
          }"
          v-on:mouseout="($event: any) => {
            // tooltip
            const tooltip = $event.view.document.querySelector('.tooltip');
            tooltip.style.display = 'none';
          }"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  imageDimensions: { width: number; height: number };
  annotations: Array<Annotation> | undefined;
}>();

interface Annotation {
  boundingPoly: Array<{ x: number; y: number }>;
  title: string;
  text: string;
  color: string;
}

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
.annotation {
  fill: #00000000;
  stroke-width: 3;
}
.tooltip {
  position: absolute;
  display: none;
  background-color: #000000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1;
  pointer-events: none;
}
.tooltip .tooltip-title {
  font-weight: bold;
}
.tooltip .tooltip-text {
  white-space: pre;
}
</style>
