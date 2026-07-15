import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  description: { type: String }
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema)