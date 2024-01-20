import { createRouter, createWebHistory } from 'vue-router';

const Demo = () => import('@/views/DemoView.vue');

const routes = [
  { path: '/', component: Demo },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
