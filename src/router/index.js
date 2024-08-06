
import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from "@/layouts/MainLayout.vue";


const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children:[
      {
        path: '',
        name: 'Home',
        component: ()=>import('@/pages/Home.vue'),
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: ()=>import('@/pages/Favorites.vue'),
      }

    ],
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/',
  }
]
const router = createRouter({
  history:createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router