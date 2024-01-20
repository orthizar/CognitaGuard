<template>
  <DemoLead @content="scrollToContent" @about="scrollToAbout" />
  <DemoContent
    ref="content"
    @content="scrollToContent"
    @about="scrollToAbout"
  />
  <DemoAbout ref="about" @content="scrollToContent" />
  <TheFooter />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";

import DemoLead from "@/components/DemoLead.vue";
import DemoContent from "@/components/DemoContent.vue";
import DemoAbout from "@/components/DemoAbout.vue";
import TheFooter from "@/components/TheFooter.vue";

const content: Ref<InstanceType<typeof DemoContent> | null> = ref(null);
const about: Ref<InstanceType<typeof DemoAbout> | null> = ref(null);

onMounted(() => {
  window.addEventListener("scroll", scrollListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollListener);
});

const getContentOffset = () => {
  return content.value?.$el.offsetTop || 0;
};

const getAboutOffset = () => {
  return about.value?.$el.offsetTop || 0;
};

let lastScrollTop = 0;

const scrollListener = () => {
  if (!content.value || !about.value) {
    return;
  }

  if (
    (lastScrollTop < getContentOffset() &&
      document.documentElement.scrollTop > getContentOffset()) ||
    (lastScrollTop > getContentOffset() &&
      document.documentElement.scrollTop < getContentOffset())
  ) {
    document.documentElement.scrollTo({ top: getContentOffset() });
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => (document.documentElement.style.overflow = ""), 400);
  }

  lastScrollTop = document.documentElement.scrollTop;
};

const scrollToContent = () => {
  lastScrollTop = getContentOffset();
  window.removeEventListener("scroll", scrollListener);
  window.scrollTo({ top: getContentOffset(), behavior: "smooth" });
  setTimeout(() => window.addEventListener("scroll", scrollListener), 500);
};

const scrollToAbout = () => {
  lastScrollTop = getAboutOffset();
  window.removeEventListener("scroll", scrollListener);
  window.scrollTo({ top: getAboutOffset(), behavior: "smooth" });
  setTimeout(() => window.addEventListener("scroll", scrollListener), 500);
};
</script>
