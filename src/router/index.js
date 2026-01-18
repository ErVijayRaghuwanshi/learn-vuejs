import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/SearchView.vue' // Import your view

const routes = [
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/',
    redirect: '/search' // Default to search page
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router