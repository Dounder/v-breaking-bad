import { characterRoute } from './../characters/router/index';
import AboutPage from '@/shared/pages/AboutPage.vue';
import HomePage from '@/shared/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //? public
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    //? characters
    { ...characterRoute, path: '/characters' },
    //? default
    { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
  ],
});

export default router;
