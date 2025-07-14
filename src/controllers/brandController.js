import BrandModel from "../models/brandModel.js"
import { DataTypes } from 'sequelize'
import { sequelize } from '../models/index.js'

const brandInstance = BrandModel(sequelize, DataTypes)
const BrandController = {

  async createBrand(req, res) {
    try {
      const { name } = req.body
      const newBrand = await brandInstance.create({ name })
      res.status(201).json(newBrand)
    } catch (error) {
      console.error('Error creating brand:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async getAllBrands(req, res) {
    try {
      const brands = await brandInstance.findAll()
      if (brands.length === 0) {
        return res.status(200).json({ message: 'No brands found', data: []})
      }
      res.status(200).json(brands)
    } catch (error) {
      console.error('Error fetching brands:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async getBrandById(req, res) {
    const { id } = req.params
    try {
      const brand = await brandInstance.findByPk(id)
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' })
      }
      res.status(200).json(brand)
    } catch (error) {
      console.error('Error fetching brand:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async updateBrand(req, res) {
    const { id } = req.params
    const { name } = req.body
    try {
      const brand = await brandInstance.findByPk(id)
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' })
      }
      brand.name = name
      await brand.save()
      res.status(200).json(brand)
    } catch (error) {
      console.error('Error updating brand:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async deleteBrand(req, res) {
    const { id } = req.params
    try {
      const brand = await brandInstance.findByPk(id)
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' })
      }
      await brand.destroy()
      res.status(204).send()
    } catch (error) {
      console.error('Error deleting brand:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default BrandController