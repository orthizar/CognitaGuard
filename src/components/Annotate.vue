<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import sizeOf from "image-size";
import { Buffer } from "buffer";
// base64 image
const image = ref("");
const imageDimensions = ref({ width: 0, height: 0 });
const faceAnnotations = ref([]);
const objectAnnotations = ref([]);

const uploadImage = (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0];
  const reader = new FileReader();
  reader.onloadend = async (e) => {
    image.value = e.target!.result!.toString();
    const buffer = Buffer.from(await file.arrayBuffer());
    const size = sizeOf(buffer);
    imageDimensions.value = {
      width: size.width ?? 0,
      height: size.height ?? 0,
    };
  };
  reader.readAsDataURL(file);
};
const annotateImage = () => {
  axios
    .post("http://localhost:3000/api/annotate", {
      image: image.value.split(",")[1],
    })
    .then((response: AxiosResponse) => {
      console.log(response.data);
      faceAnnotations.value = response.data.responses[0].faceAnnotations
        .map((faceAnnotation: any) => {
          return faceAnnotation.boundingPoly.vertices;
        })
        .sort((a: any, b: any) => {
          return getZ(b) - getZ(a);
        });
      // normalizedvertices multiply by image dimensions
      console.log(imageDimensions.value);
      objectAnnotations.value =
        response.data.responses[0].localizedObjectAnnotations
          .map((objectAnnotation: any) => {
            return objectAnnotation.boundingPoly.normalizedVertices.map(
              (vertex: any) => {
                return {
                  x: vertex.x * imageDimensions.value.width,
                  y: vertex.y * imageDimensions.value.height,
                };
              }
            );
          })
          .sort((a: any, b: any) => {
            return getZ(b) - getZ(a);
          });
    });
};

const getPolygonPoints = (polygon: Array<any>): string => {
  return polygon
    .map((vertex: any) => {
      return `${vertex.x},${vertex.y}`;
    })
    .join(" ");
};
const getZ = (polygon: Array<any>): number => {
  const x = polygon.map((vertex: any) => {
    return vertex.x;
  });
  const y = polygon.map((vertex: any) => {
    return vertex.y;
  });
  const minX = Math.min.apply(null, x);
  const maxX = Math.max.apply(null, x);
  const minY = Math.min.apply(null, y);
  const maxY = Math.max.apply(null, y);
  const z = Math.sqrt(
    Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2)
  );
  return z;
};
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img class="image" v-if="image !== ''" :src="image" alt="image" />
      <svg class="annotations-container">
        <polygon
          v-for="(polygon, index) in objectAnnotations"
          :key="index"
          :points="getPolygonPoints(polygon)"
          class="object-annotation"
        />
        <polygon
          v-for="(polygon, index) in faceAnnotations"
          :key="index"
          :points="getPolygonPoints(polygon)"
          class="face-annotation"
        />
      </svg>
    </div>
    <input type="file" accept="image/*" @change="uploadImage" />
    <button @click="annotateImage">Submit</button>
  </div>
</template>

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
.annotations-container polygon {
  transform: scale(0.5);
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
