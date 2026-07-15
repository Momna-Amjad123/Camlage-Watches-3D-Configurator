import express from 'express'
import { Cart } from '../models/Cart.js'
import { Order } from '../models/Order.js'
import { Product } from '../models/Product.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// GET /api/cart — get logged-in user's cart
router.get('/', protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.userId }).populate('items.product')
  if (!cart) cart = await Cart.create({ user: req.userId, items: [] })
  res.json(cart)
})

// POST /api/cart — add item
router.post('/', protect, async (req, res) => {
  const { productId, strapColor, caseColor, quantity } = req.body
  let cart = await Cart.findOne({ user: req.userId })
  if (!cart) cart = await Cart.create({ user: req.userId, items: [] })

  cart.items.push({ product: productId, strapColor, caseColor, quantity: quantity || 1 })
  await cart.save()
  res.status(201).json(cart)
})

// DELETE /api/cart/:id — remove one item (id = item's _id in cart.items)
router.delete('/:id', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId })
  if (!cart) return res.status(404).json({ error: 'Cart not found' })

  cart.items = cart.items.filter(item => item._id.toString() !== req.params.id)
  await cart.save()
  res.json(cart)
})

// POST /api/cart/checkout — save cart as an Order, then clear it
router.post('/checkout', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate('items.product')
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  const total = cart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  const order = await Order.create({
    user: req.userId,
    items: cart.items.map(item => ({
      product: item.product._id,
      strapColor: item.strapColor,
      caseColor: item.caseColor,
      quantity: item.quantity
    })),
    total
  })

  cart.items = []
  await cart.save()

  res.status(201).json({ msg: 'Checkout successful', order, cart })
})

// GET /api/cart/orders — logged-in user's order history
router.get('/orders', protect, async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .populate('items.product')
    .sort({ createdAt: -1 })
  res.json(orders)
})

export default router