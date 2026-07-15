import { reactive } from 'vue'
import { api } from './api/axios'

export const globalState = reactive({
  products: [],
  cart: [],
  orders: [],
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  toastMessage: null,

  showToast(msg) {
    this.toastMessage = msg
    setTimeout(() => { this.toastMessage = null }, 3000)
  },

  async fetchProducts() {
    const res = await api.get('/products')
    this.products = res.data
  },

  async fetchCart() {
    if (!this.user) return
    const res = await api.get('/cart')
    this.cart = res.data.items
  },

  async addToCart(productId, strapColor, caseColor) {
    const res = await api.post('/cart', { productId, strapColor, caseColor })
    this.cart = res.data.items
    this.showToast('Product added to cart')
  },

  async removeFromCart(itemId) {
    const res = await api.delete(`/cart/${itemId}`)
    this.cart = res.data.items
  },

  async checkout() {
    const res = await api.post('/cart/checkout')
    this.cart = res.data.cart.items
    this.showToast('Order placed!')
    return res.data.order
  },

  async fetchOrders() {
    const res = await api.get('/cart/orders')
    this.orders = res.data
  },

  async login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    this.user = res.data.user
  },

  async signup(name, email, password) {
    const res = await api.post('/auth/signup', { name, email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    this.user = res.data.user
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.user = null
    this.cart = []
  }
})