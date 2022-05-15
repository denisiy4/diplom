import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/home-view.vue';
import TaskView from '../views/task-view.vue';

const routes = [
  {
    name: 'home-view',
    component: HomeView,
    path: '/'
  },
  {
    name: 'task-view',
    component: TaskView,
    path: '/task'
  },
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})
