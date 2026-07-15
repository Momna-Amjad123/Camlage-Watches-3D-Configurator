import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Product } from './models/Product.js'

dotenv.config()

const watches = [
  { name: 'Camlage Classic', price: 220, category: 'Dress', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600', description: 'A simple, clean watch for everyday wear. Steel case, leather strap.' },
  { name: 'Camlage Chrono', price: 340, category: 'Sport', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600', description: 'A sport watch with a stopwatch function. Built for daily use.' },
  { name: 'Camlage Diver', price: 290, category: 'Sport', image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=600', description: 'Water-resistant with a rotating bezel. Good for swimming and diving.' },
  { name: 'Camlage Aviator', price: 315, category: 'Sport', image: 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&q=80&w=600', description: 'Large, easy-to-read dial made for pilots and travel.' },
  { name: 'Camlage Heritage', price: 260, category: 'Dress', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600', description: 'A classic round dial with a slim case. Timeless, everyday style.' },
  { name: 'Camlage Skeleton', price: 480, category: 'Dress', image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=600', description: 'See-through dial that shows the moving parts inside.' },
  { name: 'Camlage Field', price: 195, category: 'Sport', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=600', description: 'A tough, no-fuss watch with a canvas strap. Built for outdoor use.' },
  { name: 'Camlage Moonphase', price: 410, category: 'Dress', image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=600', description: 'Shows the phase of the moon along with the time and date.' },
  { name: 'Camlage Racer', price: 355, category: 'Sport', image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&q=80&w=600', description: 'A racing-inspired chronograph with a bold, easy-read dial.' },
  { name: 'Camlage Minimal', price: 175, category: 'Dress', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600', description: 'No numbers, no clutter. Just clean hands on a plain dial.' }
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  await Product.deleteMany()
  await Product.insertMany(watches)
  console.log('Seeded', watches.length, 'products')
  process.exit()
}

seed()