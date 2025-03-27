import { createRouter, createWebHistory } from 'vue-router';
import Board from '@/views/Board.vue';
import Login from '@/views/Login.vue';
import Regis from '@/views/Regis.vue';

const routes = [
  {
    path: '/',
    name: 'Board',
    component: Board,

      },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regis',
    name: 'regis',
    component: Regis
  }
];
  
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
