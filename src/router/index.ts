import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Login', component: () => import('../views/LoginV.vue') }
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router;
