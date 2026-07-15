import express from 'express'
import { Product } from '../models/Product.js'

const router = express.Router()

// GET /api/products — all
router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

// GET /api/products/:id — one
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ error: 'Not found' })
  res.json(product)
})

// POST /api/products — create
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/products/:id — update
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(product)
})

// DELETE /api/products/:id — delete
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ msg: 'Deleted' })
})

export default router