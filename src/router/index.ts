import { createRouter,createWebHashHistory } from 'vue-router';
import Board from '@/views/Board.vue';
import Login from '@/views/Login.vue';
import Regis from '@/views/Regis.vue';

const routes = [
  {
    path: '/Board',
    name: 'Board',
    component: Board,

      },
  {
    path: '/',
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
  history: createWebHashHistory(),
  routes
});

export default router;
