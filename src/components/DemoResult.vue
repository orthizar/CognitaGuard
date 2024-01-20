<template>
  <h2 class="font-normal">Risikobewertung</h2>
  <Score :faces="props.faces" :objects="props.objects" />
  <FacesImage :image="props.image" :image-dimensions="props.imageDimensions" :faces="props.faces" />
  <ObjectsImage :image="props.image" :image-dimensions="props.imageDimensions" :objects="props.objects" />
  <div class="mt-9 xl:flex xl:justify-center xl:mt-12 xl:gap-5">
    <button class="!w-full xl:!w-48 btn btn--primary" @click="emit('reset')">
      Erneute Analyse
    </button>
    <button class="!w-full xl:!w-48 mt-2 xl:mt-0 btn btn--secondary" @click="emit('about')">
      Mehr darüber
    </button>
  </div>
</template>

<script setup lang="ts">
import FacesImage from '@/components/FacesImage.vue';
import ObjectsImage from '@/components/ObjectsImage.vue';
import Score from "@/components/Score.vue";

import DemoFace from '@/interfaces/DemoFace';
import DemoObject from '@/interfaces/DemoObject';
import Dimensions from '@/interfaces/Dimensions';

const emit = defineEmits(['reset', 'about']);

const props = defineProps<{
  faces: DemoFace[],
  objects: DemoObject[],
  image: string,
  imageDimensions: Dimensions,
}>();
</script>