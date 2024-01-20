<template>
  <label
    class="flex flex-col items-center justify-center w-full p-5 border-dashed cursor-pointer xl:p-8 border-[3px] border-gray-lighter"
    :class="{ 'opacity-70': isDrag && !disableUpload }"
    @drop="onDrop"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
  >
    <UploadIcon class="fill-primary" />
    <template v-if="!image">
      <span class="mt-4 text-center">
        Bild hierher ziehen um es hochzuladen.
      </span>
      <span class="text-gray-lighter"> Alternativ kann auch </span>
      <span class="font-bold text-primary"> hier gelickt werden. </span>
    </template>
    <span v-else class="mt-4 text-center break-all">
      <br/>{{ imageName }}<br/>
    </span>
    <input type="file" class="sr-only" accept="image/*" @change="uploadImage" />
  </label>
</template>

<script setup lang="ts">
import UploadIcon from "@/assets/icons/upload.svg";
import { ref } from "vue";

const emit = defineEmits(["upload"]);

const image = ref("");
const imageName = ref("");
const isDrag = ref(false);
const disableUpload = ref(false);

const uploadImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image.value = event.target?.result as string;
      imageName.value = file.name;
      emit("upload", event.target?.result);
    };
    reader.readAsDataURL(file);
  }
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  isDrag.value = false;

  if (disableUpload.value) {
    disableUpload.value = false;
    return;
  }

  if (event.dataTransfer?.items?.length) {
    const file = event.dataTransfer.items[0].getAsFile();
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        image.value = event.target?.result as string;
        imageName.value = file.name;
        emit("upload", event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();

  disableUpload.value = false;
  isDrag.value = true;

  if (event.dataTransfer?.items?.length) {
    if (event.dataTransfer.items.length > 1) {
      disableUpload.value = true;
    }

    if (
      event.dataTransfer.items[0] &&
      !event.dataTransfer.items[0].type.startsWith("image/")
    ) {
      disableUpload.value = true;
    }
  }
};

const onDragLeave = () => {
  disableUpload.value = false;
  isDrag.value = false;
};
</script>
