<template>
  <section class="relative">
    <div
      class="relative flex min-h-screen py-12 mx-4 lg:py-32 xl:gap-2 xl:mx-auto xl:grid xl:grid-cols-12 max-w-[100rem]"
    >
      <article
        class="relative flex flex-col w-full max-w-lg col-span-8 col-start-3 mx-auto xl:max-w-none"
      >
        <div
          class="hidden xl:block w-[11rem] left-[-2rem] bottom-[0rem] shape"
        ></div>

        <div
          class="relative flex flex-col h-full px-5 pt-6 xl:p-10 xl:pb-12 pb-9 bg-gray-dark bg-opacity-90 rounded-2xl"
        >
          <DemoUpload v-if="!isLoading && !image" @submit="submitImage" />
          <DemoLoading v-else-if="isLoading" />
          <DemoResult
            v-else
            :faces="faces"
            :objects="objects"
            :image="image"
            :image-dimensions="imageDimensions"
            @reset="reset"
            @about="emit('about')"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, ref, type Ref } from "vue";
import sizeOf from "image-size";
import { Buffer } from "buffer";

import DemoUpload from "@/components/DemoUpload.vue";
import DemoLoading from "@/components/DemoLoading.vue";
import DemoResult from "@/components/DemoResult.vue";

import type DemoFace from "@/interfaces/DemoFace";
import type DemoObject from "@/interfaces/DemoObject";
import type Dimensions from "@/interfaces/Dimensions";

import { annotateImage } from "@/services/annotate";
import { mapFaceAnnotations, mapObjectAnnotations } from "@/helpers/annotation";
import { assignScores } from "@/helpers/score";

const emit = defineEmits(["content", "about"]);

const isLoading = ref(false);

const image = ref("");
const imageDimensions: Ref<Dimensions> = ref({ width: 0, height: 0 });
const faces: Ref<DemoFace[]> = ref([]);
const objects: Ref<DemoObject[]> = ref([]);

const submitImage = (submittedImage: string) => {
  image.value = submittedImage;
  if (image.value) {
    doAnnotateImage();
  }
};

const doAnnotateImage = async () => {
  isLoading.value = true;

  const dimensions = sizeOf(Buffer.from(image.value.split(",")[1], "base64"));

  imageDimensions.value = {
    width: dimensions.width ?? 0,
    height: dimensions.height ?? 0,
  };
  const response = await annotateImage(image.value);

  faces.value = mapFaceAnnotations(response.data.responses[0].faceAnnotations);
  objects.value = mapObjectAnnotations(
    response.data.responses[0].localizedObjectAnnotations,
    imageDimensions.value
  );

  assignScores(faces.value, objects.value);

  isLoading.value = false;
};

const reset = () => {
  image.value = "";
  nextTick(() => emit("content"));
};
</script>
