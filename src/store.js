import { reactive } from 'vue'

// One shared product list used by the shop page and the studio page,
// so both always show the same watches.
export const products = [
  { id: 'classic', name: 'Camlage Classic', price: 220, category: 'Dress', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600', desc: 'A simple, clean watch for everyday wear. Steel case, leather strap.' },
  { id: 'chrono', name: 'Camlage Chrono', price: 340, category: 'Sport', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600', desc: 'A sport watch with a stopwatch function. Built for daily use.' },
  { id: 'diver', name: 'Camlage Diver', price: 290, category: 'Sport', image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=600', desc: 'Water-resistant with a rotating bezel. Good for swimming and diving.' },
  { id: 'aviator', name: 'Camlage Aviator', price: 315, category: 'Sport', image: 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&q=80&w=600', desc: 'Large, easy-to-read dial made for pilots and travel.' },
  { id: 'heritage', name: 'Camlage Heritage', price: 260, category: 'Dress', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600', desc: 'A classic round dial with a slim case. Timeless, everyday style.' },
  { id: 'skeleton', name: 'Camlage Skeleton', price: 480, category: 'Dress', image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=600', desc: 'See-through dial that shows the moving parts inside.' },
  { id: 'field', name: 'Camlage Field', price: 195, category: 'Sport', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600', desc: 'A tough, no-fuss watch with a canvas strap. Built for outdoor use.' },
  { id: 'moonphase', name: 'Camlage Moonphase', price: 410, category: 'Dress', image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=600', desc: 'Shows the phase of the moon along with the time and date.' },
  { id: 'racer', name: 'Camlage Racer', price: 355, category: 'Sport', image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&q=80&w=600', desc: 'A racing-inspired chronograph with a bold, easy-read dial.' },
  { id: 'minimal', name: 'Camlage Minimal', price: 175, category: 'Dress', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600', desc: 'No numbers, no clutter. Just clean hands on a plain dial.' }
]

export const globalState = reactive({
  cart: [],
  toastMessage: null,

  showToast(msg) {
    this.toastMessage = msg
    setTimeout(() => { this.toastMessage = null }, 3000)
  },

  addToCart(product) {
    this.cart.push(product)
    this.showToast(`${product.name} added to cart`)
  }
})
