<template>
  <div>
    <Annotate
      :image="image"
      :image-dimensions="imageDimensions"
      :face-annotations="faceAnnotations"
      :object-annotations="objectAnnotations"
    />
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { ref, watch } from "vue";
import sizeOf from "image-size";
import { Buffer } from "buffer";
import Annotate from "./Annotate.vue";
const props = defineProps<{
  image: string;
}>();

const imageDimensions = ref({ width: 0, height: 0 });
const faceAnnotations = ref([]);
const objectAnnotations = ref([]);
const url = process.env.VITE_APP_VERCEL_ENV === "production" ? "https://" + process.env.VITE_APP_VERCEL_URL : "http://localhost:3000";
const annotateImage = () => {
  console.log(props.image);
  axios
    .post(url + "/api/annotate", {
      image: props.image.split(",")[1],
    })
    .then((response: AxiosResponse) => {
      console.log(response);

      faceAnnotations.value = response.data.responses[0]
        .faceAnnotations?.map((faceAnnotation: any) => {
          return faceAnnotation.boundingPoly.vertices;
        })
        .sort((a: any, b: any) => {
          return getZ(b) - getZ(a);
        });
      // normalizedvertices multiply by image dimensions
      objectAnnotations.value = response.data.responses[0]
        .localizedObjectAnnotations?.map((objectAnnotation: any) => {
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
  const z = Math.sqrt(Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2));
  return z;
};

watch(
  () => props.image,
  () => {
    if (props.image !== "") {
      annotateImage();
      const dimensions = sizeOf(
        Buffer.from(props.image.split(",")[1], "base64")
      );
      imageDimensions.value = {
        width: dimensions.width ?? 0,
        height: dimensions.height ?? 0,
      };
    }
  },
  { immediate: true }
);
</script>
