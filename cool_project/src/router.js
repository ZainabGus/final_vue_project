'use strict'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'  // ← теперь HomePage, не App!

const routes = [
  { path: '/', component: HomePage },  // ← HomePage, не App
  { path: '/cart', component: () => import('./components/Cart.vue') }  // ← лучше в views/
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router