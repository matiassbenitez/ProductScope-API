import categoryModel from '../models/categoryModel.js'

const categoryController = {

  async createCategory(req, res) {
    try {
      const { name } = req.body
      const newCategory = await categoryModel.create({ name })
      res.status(201).json(newCategory)
    } catch (error) {
      console.error('Error creating category:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
  
  async getAllCategories(req, res) {
    try {
      const categories = await categoryModel.findAll()
      if (categories.length === 0) {
        return res.status(200).json({ message: 'No categories found', data: []})
      }
      res.status(200).json(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
  
  async getCategoryById(req, res) {
    const { id } = req.params
    try {
      const category = await categoryModel.findByPk(id)
      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }
      res.status(200).json(category)
    } catch (error) {
      console.error('Error fetching category:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async updateCategory(req, res) {
    const { id } = req.params
    const { name } = req.body
    try {
      const category = await categoryModel.findByPk(id)
      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }
      category.name = name
      await category.save()
      res.status(200).json(category)
    } catch (error) {
      console.error('Error updating category:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async deleteCategory(req, res) {
    const { id } = req.params
    try {
      const category = await categoryModel.findByPk(id)
      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }
      await category.destroy()
      res.status(204).send()
    } catch (error) {
      console.error('Error deleting category:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}

export default categoryController