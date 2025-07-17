
import { Category, Product } from '../models/index.js'
import { UniqueConstraintError } from 'sequelize'

const productController = {

  async createProduct(req, res) {
    try {
      const { name, description, price, available, brandId, categories } = req.body
      const newProduct = await Product.create({
        code: `P${Date.now()}`,
        name,
        description,
        price,
        available,
        brandId,
        categories
      })
      if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ error: 'Categories must be a non-empty array' })
      }
      const categoryInstances = await Category.findAll({
        where: { name: categories }
      })
      
      const foundNames = categoryInstances.map(cat => cat.name)
      const missing = categories.filter(name => !foundNames.includes(name))
      
      if (missing.length > 0) {
        return res.status(400).json({
          error: 'Some categories do not exist',
          missingCategories: missing
        })
      }
      
      await newProduct.setCategories(categoryInstances)

      res.status(201).json(newProduct)
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ error: 'Product code must be unique' })
      }
      console.error('Error creating product:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll()
      res.status(200).json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async getProductById(req, res) {
    const { id } = req.params
    try {
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ error: 'Product not fount' })
      }
      res.status(200).json(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async updateProduct(req, res) {
    const { id } = req.params
    const { code, name, description, price, available  } = req.body
    try {
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      if (name !== undefined) product.name = name
      if (code !== undefined) product.code = code
      if (description !== undefined) product.description = description
      if (price !== undefined) product.price = price
      if (available !== undefined) product.available = available
      await product.save()
      res.status(200).json(product)
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ error: 'Product code must be unique' })
      }
      console.error('Error updating product:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async deleteProduct(req, res) {
    const { id } = req.params
    try {
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      await product.destroy()
      res.status(204).send()
    } catch (error) {
      console.error('Error deleting product:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}

export default productController