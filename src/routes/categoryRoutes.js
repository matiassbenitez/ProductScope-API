import express from 'express'
import { body, param } from 'express-validator'
import categoryController from '../controllers/categoryController.js'
import handleErrorValidation from '../middlewares/handleErrorValidation.js'

const router = express.Router()

router.get('/', categoryController.getAllCategories)
router.get('/:id',
  [
    param('id').isInt().withMessage('Category ID must be an integer'),
    handleErrorValidation
  ], categoryController.getCategoryById)
router.post('/create',
  [
    body('name').notEmpty().withMessage('Category name is required'),
    handleErrorValidation
  ], categoryController.createCategory)
router.put('/update/:id',
  [
    param('id').isInt().withMessage('Category ID must be an integer'),
    body('name').notEmpty().withMessage('Category name is required'),
    handleErrorValidation
  ], categoryController.updateCategory)
router.delete('/delete/:id',
  [
    param('id').isInt().withMessage('Category ID must be an integer'),
    handleErrorValidation
  ], categoryController.deleteCategory)

export default router
