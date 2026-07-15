import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import StudioView from '../views/StudioView.vue'
import GalleryView from '../views/GalleryView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import OrdersView from '../views/OrdersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/products', component: ProductsView },
    { path: '/studio/:id?', component: StudioView },
    { path: '/gallery', component: GalleryView },
    { path: '/cart', component: CartView },
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignupView },
    { path: '/orders', component: OrdersView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router