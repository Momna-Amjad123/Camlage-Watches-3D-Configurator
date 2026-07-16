import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

app.get('/', (req, res) => res.send('Camlage API running'))

// Only start a listening server when running locally.
// On Vercel, the platform imports and calls `app` directly as a serverless function.
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
}

export default app