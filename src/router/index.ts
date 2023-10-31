import { createRouter, createWebHistory } from 'vue-router';

const Demo = () => import('@/views/DemoView.vue');
const HowItWorks = () => import('@/views/HowItWorksView.vue');

const routes = [
  { path: '/', component: Demo },
  { path: '/about', component: HowItWorks },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
