<template>
  <div>
    <Annotate
      :image="image"
      :image-dimensions="imageDimensions"
      :annotations="faceAnnotations"
    />
    <Annotate
      :image="image"
      :image-dimensions="imageDimensions"
      :annotations="objectAnnotations"
    />
    <Score :faces="faces" :objects="objects" />
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { ref, watch } from "vue";
import sizeOf from "image-size";
import { Buffer } from "buffer";
import Annotate from "./Annotate.vue";
import Score from "./Score.vue";
const props = defineProps<{
  image: string;
}>();

interface Annotation {
  boundingPoly: Array<{ x: number; y: number }>;
  title: string;
  text: string;
  color: string;
}
interface FaceAnnotation {
  boundingPoly: {
    vertices: Array<{ x: number; y: number }>;
  };
  fdBoundingPoly: {
    vertices: Array<{ x: number; y: number }>;
  };
  landmarks: Array<{
    type: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
  }>;
  rollAngle: number;
  panAngle: number;
  tiltAngle: number;
  detectionConfidence: number;
  landmarkingConfidence: number;
  joyLikelihood: string;
  sorrowLikelihood: string;
  angerLikelihood: string;
  surpriseLikelihood: string;
  underExposedLikelihood: string;
  blurredLikelihood: string;
  headwearLikelihood: string;
}
interface ObjectAnnotation {
  mid: string;
  languageCode: string;
  name: string;
  score: number;
  boundingPoly: {
    normalizedVertices: Array<{ x: number; y: number }>;
  };
}

const imageDimensions = ref({ width: 0, height: 0 });
const faces = ref([]);
const objects = ref([]);
const faceAnnotations = ref([]);
const objectAnnotations = ref([]);
const url =
  import.meta.env.VITE_VERCEL_ENV === "production"
    ? "https://cognitaguard.vercel.app"
    : "http://localhost:3000";
const annotateImage = () => {
  axios
    .post(url + "/api/annotate", {
      image: props.image.split(",")[1],
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      faces.value = response.data.responses[0].faceAnnotations?.map(
        (faceAnnotation: FaceAnnotation, index: number) => {
          const face = {
            name: `Face ${index + 1}`,
            boundingPoly: faceAnnotation.boundingPoly.vertices,
            joyLikelihood: faceAnnotation.joyLikelihood,
            sorrowLikelihood: faceAnnotation.sorrowLikelihood,
            angerLikelihood: faceAnnotation.angerLikelihood,
            surpriseLikelihood: faceAnnotation.surpriseLikelihood,
            underExposedLikelihood: faceAnnotation.underExposedLikelihood,
            blurredLikelihood: faceAnnotation.blurredLikelihood,
            headwearLikelihood: faceAnnotation.headwearLikelihood,
          };
          return face;
        }
      );
      objects.value = response.data.responses[0].localizedObjectAnnotations?.map(
        (objectAnnotation: ObjectAnnotation) => {
          const object = {
            name: objectAnnotation.name,
            boundingPoly: objectAnnotation.boundingPoly.normalizedVertices.map(
              (vertex: any) => {
                return {
                  x: vertex.x * imageDimensions.value.width,
                  y: vertex.y * imageDimensions.value.height,
                };
              }
            ),
          };
          return object;
        }
      );
      faceAnnotations.value = response.data.responses[0].faceAnnotations
        ?.map((faceAnnotation: FaceAnnotation) => {
          // return faceAnnotation.boundingPoly.vertices;
          const annotation: Annotation = {
            boundingPoly: faceAnnotation.boundingPoly.vertices.map(
              (vertex: any) => {
                return {
                  x: vertex.x,
                  y: vertex.y,
                };
              }
            ),
            title: "Face",
            text: `Confidence: ${faceAnnotation.detectionConfidence.toFixed(2)}
joyLikelihood: ${faceAnnotation.joyLikelihood}
sorrowLikelihood: ${faceAnnotation.sorrowLikelihood}
angerLikelihood: ${faceAnnotation.angerLikelihood}
surpriseLikelihood: ${faceAnnotation.surpriseLikelihood}
underExposedLikelihood: ${faceAnnotation.underExposedLikelihood}
blurredLikelihood: ${faceAnnotation.blurredLikelihood}
headwearLikelihood: ${faceAnnotation.headwearLikelihood}`,
            color: "#ff0000",
          };
          return annotation;
        })
        .sort((a: any, b: any) => {
          return getZ(b) - getZ(a);
        });
      // normalizedvertices multiply by image dimensions
      objectAnnotations.value =
        response.data.responses[0].localizedObjectAnnotations
          ?.map((objectAnnotation: ObjectAnnotation) => {
            // return objectAnnotation.boundingPoly.normalizedVertices.map(
            //   (vertex: any) => {
            //     return {
            //       x: vertex.x * imageDimensions.value.width,
            //       y: vertex.y * imageDimensions.value.height,
            //     };
            //   }
            // );
            const annotation: Annotation = {
              boundingPoly:
                objectAnnotation.boundingPoly.normalizedVertices.map(
                  (vertex: any) => {
                    return {
                      x: vertex.x * imageDimensions.value.width,
                      y: vertex.y * imageDimensions.value.height,
                    };
                  }
                ),
              title: objectAnnotation.name,
              text: `Confidence: ${objectAnnotation.score.toFixed(2)}`,
              color: "#00ff00",
            };
            return annotation;
          })
          .sort((a: any, b: any) => {
            return getZ(b) - getZ(a);
          });
    });
};
const getZ = (annotation: Annotation): number => {
  const x = annotation.boundingPoly.map((vertex) => {
    return vertex.x;
  });
  const y = annotation.boundingPoly.map((vertex) => {
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
