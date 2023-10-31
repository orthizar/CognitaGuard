// this should be a component used in App.vue
// you can upload a image and with a button click submit it in base64 to the api that will return the annotations
// the annotations will be logged in the console
<script setup lang="ts">
import { StyleValue, ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

// base64 image
const image = ref('')
const annotations = ref([])

const uploadImage = (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0];
  const reader = new FileReader();
  reader.onloadend = e => {
    image.value = e.target!.result!.toString();
    console.log(image.value.split(',')[0]);
    console.log(image.value.split(',')[1]);
  };
  reader.readAsDataURL(file);
}
const annotateImage = () => {
  axios.post("http://localhost:3000/api/annotate", {
    image: image.value.split(',')[1]
  }).then((response: AxiosResponse) => {
    console.log(response.data);
    annotations.value = response.data.responses[0].faceAnnotations.map((faceAnnotation: any) => {
      return faceAnnotation.boundingPoly.vertices;
    })
  });
}

const getPolygonPoints = (polygon: Array<any>): string => {
  return polygon.map((vertex: any) => {
    return `${vertex.x},${vertex.y}`
  }).join(' ');
}

</script>

<template>
  <div class="card">
    <div class="image-container">
      <img class="image" v-if="image !== ''" :src="image" alt="image" />
      <!-- bounding poly of the annotations -->
      <!-- <div v-for="(box, index) in annotations" :key="index" class="bounding-box" :style="getBoxStyle(box)" /> -->
      <svg class="annotations-container">
        <polygon v-for="(polygon, index) in annotations" :key="index" :points="getPolygonPoints(polygon)" class="annotation" />
      </svg>
    </div>
    <input type="file" accept="image/*" @change=uploadImage>
    <button @click="annotateImage">Submit</button>
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
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
  pointer-events: none;
}
.annotation {
  fill: none;
  stroke: #ff0000;
  stroke-width: 3;
}
</style>