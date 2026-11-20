import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
